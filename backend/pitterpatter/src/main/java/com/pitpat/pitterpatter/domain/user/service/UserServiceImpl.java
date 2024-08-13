package com.pitpat.pitterpatter.domain.user.service;

import com.pitpat.pitterpatter.domain.user.jwt.JwtTokenProvider;
import com.pitpat.pitterpatter.domain.user.model.dto.*;
import com.pitpat.pitterpatter.domain.user.repository.EmailTokenRepository;
import com.pitpat.pitterpatter.domain.user.repository.RefreshTokenRepository;
import com.pitpat.pitterpatter.domain.user.repository.UserRepository;
import com.pitpat.pitterpatter.entity.EmailTokenEntity;
import com.pitpat.pitterpatter.entity.RefreshTokenEntity;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.global.exception.exceptions.DuplicateResourceException;
import com.pitpat.pitterpatter.global.util.user.TeamNameGenerator;
import io.jsonwebtoken.Claims;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
import java.util.regex.Pattern;

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
    private final EmailTokenRepository emailTokenRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Value("${custom.random-2fa}")
    private String random2Fa;

    // 1800(초) == 30분
    private static final long EMAIL_TOKEN_EXPIRATION_TIME = 1800;

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

    // 비밀번호 검증
    @Override
    @Transactional
    public void verifyPassword(int userId, PasswordDto passwordDto) throws NoSuchElementException {
        log.info("UserServiceImpl - verifyPassword 호출");
        String password = passwordDto.getPassword();

        log.info("password: {}, userId: {}", "숨김", userId);

        // 1. userId 기반으로 비밀번호를 가져온다
        // 유저 정보가 DB에 없을 경우 NoSuchElementException 발생
        UserDto userDto = this.getUserById(userId);

        String savedPassword = userDto.getPassword();
        log.info("savedPassword: {}", "숨김");

        boolean isValid = passwordEncoder.matches(password, savedPassword);
        if (!isValid) {
            log.error("IllegalArgumentException: [비밀번호 검증] 비밀번호가 일치하지 않습니다: {}", password);
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        log.info("비밀번호가 검증됨.");
        log.info("UserServiceImpl - verifyPassword 끝");
    }


    // ============================= 회원가입 관련 ================================
    // email 유저 회원가입
    @Transactional
    @Override
    public UserDto emailSignUp(EmailUserSignUpDto emailUserSignUpDto) throws DuplicateResourceException {
        // 1. 백에서 이메일 중복체크를 한번 더 해준다
        isEmailAlreadyInUse(emailUserSignUpDto.getEmail());

        // 2. UserEntity 생성
        UserEntity userEntity = null;

        // 3. Password 유효성 검사
        String password = emailUserSignUpDto.getPassword();
        String encodedPassword = null;
        if (isValidPassword(password)) {
            // 4. Password 암호화
            encodedPassword = this.encode(password);

            // 5. 임시 2차 비밀번호 암호화
            String encoded2Fa = this.encode(random2Fa);

            // 6. 암호화된 비밀번호로 emailUserSignUpDto를 UserEntity로 변경한다.
            userEntity = emailUserSignUpDto.toEntity(encodedPassword);

            // 7. 암호화된 임시 2차 비밀번호, 임시 팀 이름을 넣는다.
            userEntity.setTwoFa(encoded2Fa);
            userEntity.setTeamName(getUniqueTeamName());

            // 7. DB에 유저 정보를 저장하고 UserDto로 변환하여 return
            return UserDto.toDto(userRepository.save(userEntity));
        }
        // 8. 비밀번호가 유효하지 않을 경우 IllegalArgumentException 발생
        else {
            log.error("IllegalArgumentException: [일반 유저 회원가입] 비밀번호 형식이 잘못되었습니다: {}", password);
            throw new IllegalArgumentException("비밀번호 형식이 잘못되었습니다. 다시 확인해주세요.");
        }
    }

    // email 유저 이메일 중복 체크
    @Transactional
    @Override
    public boolean isEmailAlreadyInUse(String email) {
        if (userRepository.existsByEmail(email)) {
            log.error("DuplicateResourceException: [이메일 중복 체크] 이메일이 중복되었습니다: {}", email);
            throw new DuplicateResourceException("이미 가입된 계정이 있습니다.");
        }
        return false;
    }

    // email, social 유저 팀 이름 중복 체크
    @Transactional
    @Override
    public boolean isTeamNameAlreadyInUse(String teamName) {
        if (userRepository.existsByTeamName(teamName)) {
            log.error("DuplicateResourceException: [팀 이름 중복 체크] 이미 사용 중인 팀 이름이 있습니다: {}", teamName);
            throw new DuplicateResourceException("이미 사용 중인 이름 입니다.");
        }
        return false;
    }


    // ====================== 조회, 변경, 탈퇴 ==========================
    // jwt 토큰에서 userId 값을 꺼내와 회원정보 조회
    @Transactional
    @Override
    public UserDto getUserById(int userId) {
        log.info("UserServiceImpl - getUserById 호출");

        // 1. userId에 해당하는 유저가 DB에 있는 지 확인
        Optional<UserEntity> existingUserOptional = userRepository.findByUserId(userId);

        // 2. DB에 유저가 존재한다면 UserDto로 변환 후 return
        if (existingUserOptional.isPresent()) {
            log.info("DB에 userId값을 가진 유저가 존재. 유저 정보 반환");
            return UserDto.toDto(existingUserOptional.get());
        }
        // 3. DB에 유저가 존재하지 않는다면 예외 발생
        else {
            log.error("NoSuchElementException: [userId값으로 회원정보 조회] 해당 userId를 가진 사용자가 존재하지 않습니다: {}", userId);
            throw new NoSuchElementException("해당 사용자가 존재하지 않습니다.");
        }
    }

    // email에 해당하는 회원정보 조회
    @Transactional
    @Override
    public UserDto getUserByEmail(String email) {
        // 1. userId에 해당하는 유저가 DB에 있는 지 확인
        Optional<UserEntity> existingUserOptional = userRepository.findByEmail(email);

        // 2. DB에 유저가 존재한다면 UserDto로 변환 후 return
        if (existingUserOptional.isPresent()) {
            return UserDto.toDto(existingUserOptional.get());
        }
        // 3. DB에 유저가 존재하지 않는다면 예외 발생
        else {
            log.error("NoSuchElementException: [email값으로 회원정보 조회] 해당 email을 가진 사용자가 존재하지 않습니다: {}", email);
            throw new NoSuchElementException("해당 사용자가 존재하지 않습니다.");
        }
    }

    // jwt 토큰에서 userId 값을 꺼내와 회원정보 변경
    @Transactional
    @Override
    public UserDto updateUserById(int userId, AdditionalUserInfoDto updatedUser) throws DuplicateResourceException, NoSuchElementException {
        String updatedTwoFa = updatedUser.getTwoFa();
        String updatedTeamName = updatedUser.getTeamName();

        // 1. userId에 해당하는 유저를 DB에서 가져옴
        // userId에 해당하는 유저가 없을 경우 NoSuchElementException 발생
        UserEntity existingUser = this.getUserById(userId).toEntity();

        // 2. 팀 이름 유효성 검사
        if (updatedTeamName != null) {
            // 백에서 한번 더 팀 이름 중복 체크
            // 팀 이름이 중복 될 경우 DuplicateResourceException 예외 발생
            isTeamNameAlreadyInUse(updatedTeamName);
            // 3. 팀 이름이 중복되지 않을 경우 UserEntity 업데이트
            existingUser.setTeamName(updatedTeamName);
        }

        if (updatedTwoFa != null) {
            // 4. 2차 비밀번호 유효성 검사
            if (isValid2fa(updatedTwoFa)) {
                // 5. 2차 비밀번호가 유효할 경우 UsetEntity 업데이트
                existingUser.setTwoFa(this.encode(updatedTwoFa));
            }
            // 6. 2차 비밀번호가 유효하지 않을 경우 IllegalArgumentException 발생
            else {
                log.error("IllegalArgumentException: [회원정보 변경] 2차 비밀번호 형식이 잘못되었습니다: {}", updatedTwoFa);
                throw new IllegalArgumentException("2차 비밀번호 형식이 잘못되었습니다. 숫자 4자리를 입력해주세요.");
            }
        }

        // 6. 유저 정보를 DB에 업데이트
        userRepository.updateTeamName(existingUser.getUserId(), existingUser.getTeamName());
        userRepository.updateTwoFa(existingUser.getUserId(), existingUser.getTwoFa());

        // 7. 플러시하여 변경 내용을 강제로 DB에 반영
        entityManager.flush();
        entityManager.clear();

        return this.getUserById(userId);
    }

    // jwt 토큰의 userId값을 이용하거나 email로 비밀번호 재설정
    @Override
    @Transactional
    public void resetPassword(String id, PasswordDto passwordDto, String type) throws NoSuchElementException {
        // userId에 해당하는 유저의 비밀번호 변경을 하는 경우
        String password = passwordDto.getPassword();
        UserEntity existingUser = null;
        if (type.equals("userId")) {
            int userId = Integer.parseInt(id);

            // 1. userId에 해당하는 유저를 DB에서 가져옴
            // userId에 해당하는 유저가 없을 경우 NoSuchElementException 발생
            existingUser = this.getUserById(userId).toEntity();

        }
        // email에 해당하는 유저의 비밀번호 변경을 하는 경우
        else if (type.equals("email")) {
            // 2. email에 해당하는 유저를 DB에서 가져옴
            // email에 해당하는 유저가 없을 경우 NoSuchElementException 발생
            existingUser = this.getUserByEmail(id).toEntity();
        }
        // 그 외
        else {
            return;
        }

        // 3. password가 유효한 지 확인
        if (isValidPassword(password)) {
            // 4. password가 유효한 경우 UserEntity에 비밀번호 업데이트
            existingUser.setPassword(this.encode(password));

            // 5. DB에 저장
            userRepository.updatePassword(existingUser.getUserId(), existingUser.getPassword());

            // 6. 이메일 토큰으로 비밀번호 재설정 시, redis에서 이메일 토큰도 같이 삭제
            if (type.equals("email")) {
                emailTokenRepository.deleteById("pw" + id);
            }
        }
        // 7. 비밀번호가 유효하지 않을 경우 IllegalArgumentException 발생
        else {
            log.error("IllegalArgumentException: [비밀번호 재설정] 비밀번호 형식이 잘못되었습니다: {}", password);
            throw new IllegalArgumentException("비밀번호 형식이 잘못되었습니다. 다시 확인해주세요.");
        }
    }

    // email로 2차 비밀번호 재설정
    @Override
    public void reset2fa(String email, TwoFaDto twoFaDto) throws NoSuchElementException {
        String twoFa = twoFaDto.getTwoFa();

        // 2. email에 해당하는 유저를 DB에서 가져옴
        // email에 해당하는 유저가 없을 경우 NoSuchElementException 발생
        UserEntity existingUser = this.getUserByEmail(email).toEntity();

        // 3. 2차 비밀번호가 유효한 지 확인
        if (isValid2fa(twoFa)) {
            // 4. 2차 비밀번호가 유효한 경우 UserEntity에 2차 비밀번호 업데이트
            existingUser.setTwoFa(this.encode(twoFa));

            // 5. DB에 저장
            userRepository.updateTwoFa(existingUser.getUserId(), existingUser.getTwoFa());

            // 6. redis에서 이메일 토큰도 같이 삭제
            emailTokenRepository.deleteById("2fa" + email);
        }
        // 7. 2차 비밀번호가 유효하지 않을 경우 IllegalArgumentException 발생
        else {
            log.error("IllegalArgumentException: [2차 비밀번호 재설정] 2차 비밀번호 형식이 잘못되었습니다: {}", twoFa);
            throw new IllegalArgumentException("2차 비밀번호 형식이 잘못되었습니다. 숫자 4자리를 입력해주세요.");
        }
    }

    // 이메일 토큰이 맞는지 검증
    @Override
    public void verifyEmailToken(String email, String emailToken) {
        // 1. redis에서 email을 id 값으로 가지고 있는 emailToken 가져오기
        Optional<EmailTokenEntity> existingEmailTokenOptional = emailTokenRepository.findByEmail(email);

        // 2. 있다면 emailToken값 가져오기
        if (existingEmailTokenOptional.isPresent()) {
            String redisEmailToken = existingEmailTokenOptional.get().getEmailToken();
            // redis에 있는 토큰과 같은지 비교
            if (redisEmailToken.equals(emailToken)) {
                return;
            }
        }

        // 3. redis에 토큰이 존재하지 않거나 redis에 있는 토큰과 들어온 토큰이 같지 않은 경우 IllegalArgumentException 예외 발생
        log.error("IllegalArgumentException: [이메일 토큰 검증] DB에 해당 이메일 토큰이 존재하지 않거나 일치하지 않습니다: {}", emailToken);
        throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
    }

    // 비밀번호 재설정 메일 발송을 위한 토큰 생성
    @Override
    @Transactional
    public String createEmailToken(EmailDto emailDto, String type) {
        String email = emailDto.getEmail();

        // UUID를 사용하여 이메일 토큰 생성
        String token = UUID.randomUUID().toString();

        // Redis에 저장
        EmailTokenEntity emailToken = EmailTokenEntity.builder()
                .email(type + email)
                .emailToken(token)
                .ttl(EMAIL_TOKEN_EXPIRATION_TIME)
                .build();
        emailTokenRepository.save(emailToken);

        return token;
    }

    // 비밀번호 / 2차 비밀번호 재설정 메일 발송
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
        String twoFa = twoFaDto.getTwoFa();

        // 1. userId에 해당하는 유저를 DB에서 가져옴
        // userId에 해당하는 유저가 없을 경우 NoSuchElementException 발생
        UserEntity existingUser = this.getUserById(userId).toEntity();
        String savedTwoFa = existingUser.getTwoFa();

        // 2. 입력한 2차 비밀번호와 저장되어있는 해시된 2차 비밀번호를 비교
        boolean isValid = passwordEncoder.matches(twoFa, savedTwoFa);

        // 3. 입력한 2차 비밀번호와 저장되어있는 해시된 2차 비밀번호가 다르다면 IllegalArgumentException 발생
        if (!isValid) {
            log.error("IllegalArgumentException: [2차 비밀번호 검증] 2차 비밀번호가 일치하지 않습니다: {}", twoFa);
            throw new IllegalArgumentException("2차 비밀번호가 일치하지 않습니다.");
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
        log.error("IllegalArgumentException: [리프레시 토큰 검증] DB에 refresh 토큰이 존재하지 않거나 일치하지 않습니다: {}", refreshToken);
        throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
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

    // 입력으로 들어온 password 유효성 검사
    @Override
    public boolean isValidPassword(String password) {
        if (password == null) {
            return false;
        }
        return Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~!@#$%^&*()\\[\\]{}_+=\\-,])[A-Za-z\\d~!@#$%^&*()\\[\\]{}_+=\\-,]{8,16}$").matcher(password).matches();
    }

    // 입력으로 들어온 2차 비밀번호 유효성 검사
    @Override
    public boolean isValid2fa(String twoFa) {
        if (twoFa == null) {
            return false;
        }
        return Pattern.compile("^\\d{4}$").matcher(twoFa).matches();
    }

    // Request Header에서 토큰 정보 추출
    @Override
    public String resolveRefreshToken(HttpServletRequest request) {
        return jwtTokenProvider.resolveTokenFromRequestHeader(request);
    }

    // 암호화
    @Override
    public String encode(String text) {
        return passwordEncoder.encode(text);
    }
}
