package com.pitpat.pitterpatter.domain.user.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@RequiredArgsConstructor
public class EmailTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // TODO: 잘못된 JWT 토큰이 들어올 경우 예외를 응답으로 던져주기
        // TODO: JWT가 아닌 UUID로 바꾸기

        // request parameter에서 토큰 정보 추출
        String token = jwtTokenProvider.resolveTokenFromRequestParam(request);

        System.out.println("EmailTokenAuthenticationFilter 들어옴: " + token);
        // TODO: 이메일 토큰 복호화?

        if (("/api/user/password/reset".equals(request.getRequestURI()) && token != null && jwtTokenProvider.validateToken(token))) {
            System.out.println("EmailTokenAuthenticationFilter 검증됨");
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

}