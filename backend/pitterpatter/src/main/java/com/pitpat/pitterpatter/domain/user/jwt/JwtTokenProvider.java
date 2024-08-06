package com.pitpat.pitterpatter.domain.user.jwt;

import com.pitpat.pitterpatter.domain.user.model.dto.JwtTokenDto;
import com.pitpat.pitterpatter.entity.RefreshTokenEntity;
import com.pitpat.pitterpatter.domain.user.repository.RefreshTokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.*;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;
    private final RefreshTokenRepository refreshTokenRepository;

    // 900000 == 15분
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 900000;
    // 604800000 == 7일
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 604800000;

    // application.yml에서 secret 값 가져와서 key에 저장
    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey, RefreshTokenRepository refreshTokenRepository) {
        // 생성자 주입 방식
        this.refreshTokenRepository = refreshTokenRepository;
        // secretkey를 base64로 디코딩
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        // hmac에서 사용할 수 있는 Key 객체로 변환
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // User 정보를 가지고 AccessToken, RefreshToken을 생성하는 메서드
    public JwtTokenDto generateToken(Authentication authentication) {

        // 1. 시간 설정
        long nowMillis = System.currentTimeMillis();

        // 2. Access Token 생성
        String accessToken = generateAccessToken(authentication.getName(), nowMillis, ACCESS_TOKEN_EXPIRATION_TIME);

        // 3. Refresh Token 생성 후 저장
        String refreshToken = generateRefreshToken(authentication.getName(), nowMillis, REFRESH_TOKEN_EXPIRATION_TIME);
        saveRefreshToken(Integer.parseInt(authentication.getName()), refreshToken, REFRESH_TOKEN_EXPIRATION_TIME);

        return JwtTokenDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    // Refresh Token을 Redis에 저장
    public void saveRefreshToken(int userId, String refreshToken, long expirationTime) {
        long seconds = expirationTime / 1000; // 초 단위로 바꿈
        RefreshTokenEntity refreshTokenEntity = RefreshTokenEntity.builder()
                                                        .userId(userId)
                                                        .refreshToken(refreshToken)
                                                        .ttl(seconds)
                                                        .build();
        refreshTokenRepository.save(refreshTokenEntity);
    }

    // Access Token 생성
    public String generateAccessToken(String userId, long nowMillis, long expirationTime) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userId, nowMillis, expirationTime);
    }

    // Refresh Token 생성
    public String generateRefreshToken(String userId, long nowMillis, long expirationTime) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userId, nowMillis, expirationTime);
    }

    // 전달받은 파라미터로부터 토큰 생성
    public String createToken(Map<String, Object> claims, String subject, long nowMillis, long expirationTime) {
        String ISSUER = "com.pitpat.pitterpatter";
        Date now = new Date(nowMillis);
        Date exp = new Date(nowMillis + expirationTime);

        return Jwts.builder()
                .claims(claims) // 기타 정보
                .subject(subject) // 사용자 식별자
                .issuer(ISSUER) // 토큰 발행자
                .notBefore(now) // 활성화 시간
                .issuedAt(now) // 발행 시간
                .expiration(exp) // 만료 시간
                .setId(UUID.randomUUID().toString()) // 고유 식별자
                .signWith(key, SignatureAlgorithm.HS512) // 서명 알고리즘 및 키
                .compact();
    }

    // Jwt 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
    public Authentication getAuthentication(String token) {
        // Jwt 토큰 복호화
        Claims claims = parseClaims(token);

        // 빈 권한 리스트
        Collection<? extends GrantedAuthority> authorities = Collections.emptyList();

        // UserDetails 객체를 만들어서 Authentication return
        // UserDetails: interface, User: UserDetails를 구현한 class
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
    
    // 토큰 정보를 검증하는 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException e) {
            log.error("Not expected JWT Token format", e);
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty.", e);
        } catch (Exception e) {
            log.error("Internal server error.", e);
        }
        return false;
    }

    // jwt 토큰 복호화
    public Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    // Request Header에서 토큰 정보 추출
    public String resolveTokenFromRequestHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // Request Parameter에서 토큰 정보 추출
    public String resolveTokenFromRequestParam(HttpServletRequest request) {
        String token = request.getParameter("token");
        return token;
    }
}
