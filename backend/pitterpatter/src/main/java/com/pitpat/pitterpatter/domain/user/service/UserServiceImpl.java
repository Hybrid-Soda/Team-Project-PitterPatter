package com.pitpat.pitterpatter.domain.user.service;

import com.pitpat.pitterpatter.domain.user.jwt.JwtTokenProvider;
import com.pitpat.pitterpatter.domain.user.model.dto.*;
import com.pitpat.pitterpatter.domain.user.repository.RefreshTokenRepository;
import com.pitpat.pitterpatter.domain.user.repository.UserRepository;
import com.pitpat.pitterpatter.entity.RefreshTokenEntity;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.global.exception.user.DuplicateResourceException;
import com.pitpat.pitterpatter.global.util.user.TeamNameGenerator;
import io.jsonwebtoken.Claims;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${custom.random-2fa}")
    private String random2Fa;

    // 1800000 == 30분
    private static final long EMAIL_TOKEN_EXPIRATION_TIME = 1800000;

    // ============================= 로그인 관련 ================================
    // TODO: 로그인은 추후 Spring Security Filter로 구현하기
    // (인증 로직을 보안 필터로 분리하여 책임을 명확히. 보안 필터를 통해 모든 요청을 통합적으로 처리할 수 있어, 보안 취약점을 최소화.)
    // email 유저 로그인
    @Transactional
    @Override
    public JwtTokenDto emailLogin(String email, String password) {

        // 1. `email + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);

        // 2. 실제 검증. authenticate() 메서드를 통해 요청된 User 에 대한 검증 진행
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtTokenDto jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }

    // ============================= 회원가입 관련 ================================
    // email 유저 회원가입
    @Transactional
    @Override
    public UserDto emailSignUp(EmailUserSignUpDto emailUserSignUpDto) throws DuplicateResourceException, IllegalArgumentException {
        // 1. 백에서 이메일 중복체크를 한번 더 해준다
        isEmailAlreadyInUse(emailUserSignUpDto.getEmail());

        // 2. UserEntity 생성
        UserEntity userEntity = null;

        // 3. Password 유효성 검사
        String password = emailUserSignUpDto.getPassword();
        String encodedPassword = null;
        // password가 유효하지 않은 경우 IllegalArgumentException 예외 발생
        isValidPassword(password);

        // 4. Password 암호화
        // password가 유효한 경우 password 암호화
        encodedPassword = this.encode(password);
        String encoded2Fa = this.encode(random2Fa);

        // 5. emailUserSignUpDto를 UserEntity로 변경하고 2차 비밀번호와 팀 이름을 임의로 넣는다.
        userEntity = emailUserSignUpDto.toEntity(encodedPassword);
        userEntity.setTwoFa(encoded2Fa);
        userEntity.setTeamName(getUniqueTeamName());

        // 6. DB에 유저 정보를 저장하고 UserDto로 변환하여 return
        return UserDto.toDto(userRepository.save(userEntity));
    }

    // email 유저 이메일 중복 체크
    @Transactional
    @Override
    public boolean isEmailAlreadyInUse(String email) {
        if (userRepository.existsByEmail(email)) {
            log.error("DuplicateResourceException: Duplicate email sign-up attempt with email: {}", email);
            throw new DuplicateResourceException("This email address is already registered.");
        }
        return false;
    }

    // email, social 유저 팀 이름 중복 체크
    @Transactional
    @Override
    public boolean isTeamNameAlreadyInUse(String teamName) {
        if (userRepository.existsByTeamName(teamName)) {
            log.error("DuplicateResourceException: Duplicate team name sign-up attempt with team name: {}", teamName);
            throw new DuplicateResourceException("This team name is already in use.");
        }
        return false;
    }

    // ====================== 조회, 변경, 탈퇴 ==========================
    // jwt 토큰에서 userId 값을 꺼내와 회원정보 조회
    @Transactional
    @Override
    public UserDto getUserById(int userId) {
        // 1. userId에 해당하는 유저가 DB에 있는 지 확인
        Optional<UserEntity> existingUserOptional = userRepository.findByUserId(userId);

        // 2. DB에 유저가 존재한다면 UserDto로 변환 후 return
        if (existingUserOptional.isPresent()) {
            return UserDto.toDto(existingUserOptional.get());
        }
        // 3. DB에 유저가 존재하지 않는다면 예외 발생
        else {
            log.error("NoSuchElementException: User not found with id: {}", userId);
            throw new NoSuchElementException("User not found");
        }
    }

    // jwt 토큰에서 userId 값을 꺼내와 회원정보 변경
    @Transactional
    @Override
    public UserDto updateUserById(int userId, AdditionalUserInfoDto updatedUser) throws DuplicateResourceException, IllegalArgumentException, NoSuchElementException {
        // 1. userId에 해당하는 유저를 DB에서 가져옴
        // userId에 해당하는 유저가 없을 경우 NoSuchElementException 발생
        UserEntity existingUser = this.getUserById(userId).toEntity();

        // 2. 팀 이름 유효성 검사
        if (updatedUser.getTeamName() != null) {
            // 백에서 한번 더 팀 이름 중복 체크
            // 팀 이름이 중복 될 경우 DuplicateResourceException 예외 발생
            isTeamNameAlreadyInUse(updatedUser.getTeamName());
            existingUser.setTeamName(updatedUser.getTeamName());
        }

        // 3. 2차 비밀번호 유효성 검사
        // 2차 비밀번호가 유효하지 않을 경우 IllegalArgumentException 발생
        isValidPassword(updatedUser.getTwoFa());

        // 4. 2차 비밀번호가 유효할 경우 UsetEntity 업데이트
        existingUser.setTwoFa(this.encode(updatedUser.getTwoFa()));

        // 5. 업데이트된 유저 정보를 DB에 저장 후 UserDto 형태로 변환하여 return
        return UserDto.toDto(userRepository.save(existingUser));
    }

    // jwt 토큰에서 userId 값을 꺼내와 비밀번호 재설정
    @Override
    @Transactional
    public void resetPassword(int userId, PasswordDto passwordDto) throws IllegalArgumentException, NoSuchElementException {
        // 1. userId에 해당하는 유저를 DB에서 가져옴
        // userId에 해당하는 유저가 없을 경우 NoSuchElementException 발생
        UserEntity existingUser = this.getUserById(userId).toEntity();

        // 2. password가 유효한 지 확인
        // 비밀번호가 유효하지 않을 경우 IllegalArgumentException 발생
        String password = passwordDto.getPassword();
        isValidPassword(password);

        // 3. password가 유효한 경우 UserEntity에 비밀번호 업데이트
        existingUser.setPassword(this.encode(password));

        // 4. DB에 저장
        userRepository.save(existingUser);
    }

    // 비밀번호 재설정 메일 발송을 위한 토큰 생성
    @Override
    @Transactional
    public String createEmailToken(EmailDto emailDto) {
        String email = emailDto.getEmail();

        // 1. JWT 토큰 생성
        long nowMillis = System.currentTimeMillis();
        String jwtToken = jwtTokenProvider.generateAccessToken(email, nowMillis, EMAIL_TOKEN_EXPIRATION_TIME);

        return jwtToken;
    }

    // 비밀번호 재설정 메일 발송
    @Override
    public void sendEmail(EmailDto emailDto, String subject, String text) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true); // true indicates multipart message

        helper.setTo(emailDto.getEmail());
        helper.setSubject(subject);
        helper.setText(text, true); // true indicates HTML

        mailSender.send(message);
    }

    // jwt 토큰에서 userId 값을 꺼내와 2차 비밀번호 검증
    @Override
    public void verify2fa(int userId, TwoFaDto twoFaDto) throws NoSuchElementException {
        // 1. userId에 해당하는 유저를 DB에서 가져옴
        // userId에 해당하는 유저가 없을 경우 NoSuchElementException 발생
        UserEntity existingUser = this.getUserById(userId).toEntity();

        // 2. 입력한 2차 비밀번호와 저장되어있는 해시된 2차 비밀번호를 비교
        boolean isValid = passwordEncoder.matches(twoFaDto.getTwoFa(), existingUser.getTwoFa());

        // 3. 입력한 2차 비밀번호와 저장되어있는 해시된 2차 비밀번호가 다르다면 IllegalArgumentException 발생
        if (!isValid) {
            log.error("IllegalArgumentException: 2FA has not been verified: {}", twoFaDto.getTwoFa());
            throw new IllegalArgumentException("This 2FA has not been verified.");
        }
    }

    // jwt 토큰에서 userId 값을 꺼내와 회원 탈퇴
    @Override
    @Transactional
    public void deleteUser(int userId) throws NoSuchElementException {
        // 1. userId로 User 엔티티를 조회
        // 없을 경우 NoSuchElementException 발생
        UserDto user = this.getUserById(userId);

        // 2. DB에서 User 엔티티 삭제
        userRepository.deleteById((long) userId);

        // 3. redis에서 userId에 해당하는 refresh token도 같이 삭제
        // 없을 경우 아무일도 일어나지 않음
        refreshTokenRepository.deleteById(String.valueOf(userId));
    }

    // acccess token, refresh token 재발급 요청
    @Override
    public JwtTokenDto reissueToken(String refreshToken) throws IllegalArgumentException, NoSuchElementException {
        // 1. 토큰 복호화
        Claims claims = jwtTokenProvider.parseClaims(refreshToken);
        String userId = claims.getSubject();

        // 2. redis에 저장된 refresh 토큰과 맞는지 검증
        // 맞지 않을 경우 IllegalArgumentException 예외 발생
        this.verifyRefreshToken(refreshToken, userId);

        // 3. db에서 userId에 맞는 user 꺼내오기
        // user가 없을 경우 NoSuchElementException 발생
        UserDto userDto = this.getUserById(Integer.parseInt(userId));

        // 4. UserDetails 객체를 만들어서 Authentication 생성
        UserDetails principal = new CustomUserDetailsDto(userDto);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, "", principal.getAuthorities());

        // JWT 토큰 발급
        return jwtTokenProvider.generateToken(authentication);
    }

    // redis에 저장된 refresh 토큰과 맞는지 검증
    @Override
    public void verifyRefreshToken(String refreshToken, String userId) {
        // 2. redis에 있는 refresh 토큰 꺼내오기
        Optional<RefreshTokenEntity> existingRefreshTokenOptional = refreshTokenRepository.findByUserId(userId);

        // redis에 refresh 토큰이 존재하는 경우
        if (existingRefreshTokenOptional.isPresent()) {
            // redis에 있는 토큰과 같은지 비교
            String redisRefreshToken = existingRefreshTokenOptional.get().getRefreshToken();
            if (redisRefreshToken.equals(refreshToken)) {
                return;
            }
        }

        // redis에 토큰이 존재하지 않거나 redis에 있는 토큰과 들어온 토큰이 같지 않은 경우 예외 발생
        throw new IllegalArgumentException("JWT Token is not same");
    }


    // ====================== 기타 ============================
    // TODO: CustomOAuth2UserService에도 getUniqueTeamName()이 있으므로 따로 빼서 사용하기
    // 팀 이름 생성기를 이용하여 db에 없는 유니크한 팀 이름 반환
    @Override
    public String getUniqueTeamName() {
        String teamName = null;
        do {
            teamName = TeamNameGenerator.generateTeamName();
        } while(userRepository.existsByTeamName(teamName));
        return teamName;
    }

    // TODO: 좀 더 디테일하게 구현하기
    // 입력으로 들어온 password가 유효한 지 한번 더 확인
    @Override
    public void isValidPassword(String password) {
        if (password == null || password.trim().equals("")) {
            log.error("IllegalArgumentException: Password is invalid: {}", password);
            throw new IllegalArgumentException("This password is invalid");
        }
    }

    // Request Header에서 토큰 정보 추출
    public String resolveRefreshToken(HttpServletRequest request) {
        return jwtTokenProvider.resolveTokenFromRequestHeader(request);
    }

    // 암호화
    public String encode(String text) {
        return passwordEncoder.encode(text);
    }
}
