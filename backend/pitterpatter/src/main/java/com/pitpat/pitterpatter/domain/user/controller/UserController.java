package com.pitpat.pitterpatter.domain.user.controller;

import com.pitpat.pitterpatter.domain.user.model.dto.*;
import com.pitpat.pitterpatter.domain.user.service.UserService;
import io.jsonwebtoken.security.SecurityException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    // =================== 로그인 관련 ===========================
    // email 유저 로그인 메서드
    @PostMapping("/login/email")
    public ResponseEntity<Map<String, Object>> emailLogin(@RequestBody LoginDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        JwtTokenDto jwtToken = userService.emailLogin(email, password);
        log.info("request email = {}, password = {}", email, password);
        log.info("jwtToken accessToken = {}", jwtToken.getAccessToken());

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Success");
        response.put("data", jwtToken);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 비밀번호 검증
    @PostMapping("/verify/password")
    public ResponseEntity<Map<String, Object>> verifyPassword(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PasswordDto passwordDto) {
        log.info("UserController - verifyPassword 호출");
        int userId = Integer.parseInt(userDetails.getUsername());
        log.info("password: {}, userId: {}", "숨김", userId);
        userService.verifyPassword(userId, passwordDto);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "비밀번호가 검증되었습니다.");
        response.put("data", null);
        log.info("UserController - verifyPassword 끝");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // ============================= 회원가입 관련 ================================
    // email 유저 회원가입
    @PostMapping("/email")
    public ResponseEntity<Map<String, Object>> emailSignUp(@RequestBody EmailUserSignUpDto emailUserSignUpDto) {
        UserDto savedUserDto = userService.emailSignUp(emailUserSignUpDto);

        savedUserDto.setTwoFa(null);
        savedUserDto.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Created");
        response.put("data", savedUserDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // email 유저 이메일 중복 체크
    @GetMapping("/check/email")
    public ResponseEntity<Map<String, Object>> isEmailAlreadyInUse(@RequestParam(name = "email") String email) {
        userService.isEmailAlreadyInUse(email);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "사용할 수 있는 계정 입니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // email, social 유저 팀 이름 중복 체크
    @GetMapping("/check/teamname")
    public ResponseEntity<Map<String, Object>> isTeamNameAlreadyInUse(@RequestParam(name = "teamname") String teamName) {
        userService.isTeamNameAlreadyInUse(teamName);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "사용할 수 있는 이름 입니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // ====================== 조회, 변경, 탈퇴, 검증 ==========================
    // jwt 토큰에서 userId 값을 꺼내와 회원정보 조회
    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserById(@AuthenticationPrincipal UserDetails userDetails) {
        int userId = Integer.parseInt(userDetails.getUsername());
        UserDto userDto = userService.getUserById(userId);

        userDto.setTwoFa(null);
        userDto.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Success");
        response.put("data", userDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // jwt 토큰에서 userId 값을 꺼내와 회원정보(2차 비밀번호, 팀 이름) 변경
    @PatchMapping
    public ResponseEntity<Map<String, Object>> updateUserById(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AdditionalUserInfoDto updatedUser) {
        int userId = Integer.parseInt(userDetails.getUsername());
        UserDto userDto = userService.updateUserById(userId, updatedUser);

        userDto.setTwoFa(null);
        userDto.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Success");
        response.put("data", userDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // jwt 토큰에서 id 값을 꺼내와 비밀번호 재설정
    @PatchMapping("/password/reset/id")
    public ResponseEntity<Map<String, Object>> resetPasswordByUserId(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PasswordDto passwordDto) {
        String userId = userDetails.getUsername();
        userService.resetPassword(userId, passwordDto, "userId");

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "비밀번호 재설정이 성공적으로 완료되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // email 토큰으로 비밀번호 재설정
    @PatchMapping("/password/reset/token")
    public ResponseEntity<Map<String, Object>> resetPasswordByEmailToken(@RequestBody ResetPasswordByEmailTokenCombinedDto resetPasswordByEmailTokenCombinedDto) {
        PasswordDto passwordDto = resetPasswordByEmailTokenCombinedDto.getPasswordDto();
        EmailTokenVerifyDto emailTokenVerifyDto = resetPasswordByEmailTokenCombinedDto.getEmailTokenVerifyDto();
        String email = emailTokenVerifyDto.getEmail();
        String emailToken = emailTokenVerifyDto.getEmailToken();

        // 1. 이메일 토큰이 맞는지 다시 검증
        // 만약 검증되지 않은 토큰이라면 IllegalArgumentException 발생
        userService.verifyEmailToken("pw" + email, emailToken);

        // 2. 비밀번호 재설정
        userService.resetPassword(email, passwordDto, "email");

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "비밀번호 재설정이 성공적으로 완료되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // email 토큰으로 2차 비밀번호 재설정
    @PatchMapping("/2fa/reset/token")
    public ResponseEntity<Map<String, Object>> reset2faByEmailToken(@RequestBody Reset2faByEmailTokenCombinedDto reset2faByEmailTokenCombinedDto) {
        TwoFaDto twoFaDto = reset2faByEmailTokenCombinedDto.getTwoFaDto();
        EmailTokenVerifyDto emailTokenVerifyDto = reset2faByEmailTokenCombinedDto.getEmailTokenVerifyDto();
        String email = emailTokenVerifyDto.getEmail();
        String emailToken = emailTokenVerifyDto.getEmailToken();

        // 1. 이메일 토큰이 맞는지 다시 검증
        // 만약 검증되지 않은 토큰이라면 IllegalArgumentException 발생
        userService.verifyEmailToken("2fa" + email, emailToken);

        // 2. 2차 비밀번호 재설정
        userService.reset2fa(email, twoFaDto);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "2차 비밀번호 재설정이 성공적으로 완료되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 비밀번호 재설정을 위한 이메일 토큰이 맞는지 검증
    @PostMapping("/verify/password/reset_token")
    public ResponseEntity<Map<String, Object>> verifyEmailTokenForResetPassword(@RequestBody EmailTokenVerifyDto emailTokenVerifyDto) {
        String email = emailTokenVerifyDto.getEmail();
        String emailToken = emailTokenVerifyDto.getEmailToken();

        // 1. 이메일 토큰 검증
        // 만약 검증되지 않은 토큰이라면 IllegalArgumentException 발생
        userService.verifyEmailToken("pw" + email, emailToken);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "토큰이 검증되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 2차 비밀번호 재설정을 위한 이메일 토큰이 맞는지 검증
    @PostMapping("/verify/2fa/reset_token")
    public ResponseEntity<Map<String, Object>> verifyEmailTokenForReset2fa(@RequestBody EmailTokenVerifyDto emailTokenVerifyDto) {
        String email = emailTokenVerifyDto.getEmail();
        String emailToken = emailTokenVerifyDto.getEmailToken();

        // 1. 이메일 토큰 검증
        // 만약 검증되지 않은 토큰이라면 IllegalArgumentException 발생
        userService.verifyEmailToken("2fa" + email, emailToken);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "토큰이 검증되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 비밀번호 재설정 메일 발송
    @PostMapping("/password/reset_token")
    public ResponseEntity<Map<String, Object>> sendMailForResetPassword(@RequestBody EmailDto emailDto) throws MessagingException {
        String email = emailDto.getEmail();

        // 이메일 토큰 생성
        String emailToken =  userService.createEmailToken(emailDto, "pw");

        // 메일 발송
        String resetUrl = "https://ssafy-common.b-cdn.net/reset-password?token=" + emailToken + "&email=" + email;
        String subject = "[피터패터] 비밀번호 재설정 요청 메일입니다.";
        String htmlContent = "<h1>비밀번호 재설정을 요청하셨습니다.</h1><br>" +
                "<p>안녕하세요.</p>" +
                "<p>피터패터 계정의 비밀번호 재설정을 요청하셨습니다.</p><br>" +
                "<p>비밀번호를 재설정하시려면 아래 링크를 클릭해주세요.</p>" +
                "<p><b>링크는 30분 후에 만료됩니다.</b></p><br>" +
                "<a href=\"" +
                resetUrl +
                "\">비밀번호 재설정</a>";
        userService.sendEmail(emailDto, subject, htmlContent);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "비밀번호 재설정 메일이 발송되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 2차 비밀번호 재설정 메일 발송
    @PostMapping("/2fa/reset_token")
    public ResponseEntity<Map<String, Object>> sendMailForReset2fa(@RequestBody EmailDto emailDto) throws MessagingException {
        String email = emailDto.getEmail();

        // 이메일 토큰 생성
        String emailToken =  userService.createEmailToken(emailDto, "2fa");

        // 메일 발송
        String resetUrl = "https://ssafy-common.b-cdn.net/reset-sfa?token=" + emailToken + "&email=" + email;
        String subject = "[피터패터] 2차 비밀번호 재설정 요청 메일입니다.";
        String htmlContent = "<h1>2차 비밀번호 재설정을 요청하셨습니다.</h1><br>" +
                "<p>안녕하세요.</p>" +
                "<p>피터패터 계정의 2차 비밀번호 재설정을 요청하셨습니다.</p><br>" +
                "<p>2차 비밀번호를 재설정하시려면 아래 링크를 클릭해주세요.</p>" +
                "<p><b>링크는 30분 후에 만료됩니다.</b></p><br>" +
                "<a href=\"" +
                resetUrl +
                "\">2차 비밀번호 재설정</a>";
        userService.sendEmail(emailDto, subject, htmlContent);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "2차 비밀번호 재설정 메일이 발송되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // jwt 토큰에서 userId 값을 꺼내와 2차 비밀번호 검증
    @PostMapping("/verify/2fa")
    public ResponseEntity<Map<String, Object>> verify2fa(@AuthenticationPrincipal UserDetails userDetails, @RequestBody TwoFaDto twoFaDto) {
        int userId = Integer.parseInt(userDetails.getUsername());
        userService.verify2fa(userId, twoFaDto);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "2차 비밀번호가 검증되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // TODO: 예외 처리 구체적으로
    // jwt 토큰에서 userId 값을 꺼내와 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
        int userId = Integer.parseInt(userDetails.getUsername());
        userService.deleteUser(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "회원 탈퇴가 성공적으로 완료되었습니다.");
        response.put("data", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // acccess token, refresh token 재발급 요청
    // (Refresh Token Rotation을 위해 access 토큰이 만료될 때 refresh token도 같이 새로 발급)
    @PatchMapping("/reissue")
    public ResponseEntity<Map<String, Object>> reissue(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        // Request Header에서 토큰 정보 추출
        String refreshToken = userService.resolveRefreshToken(httpRequest);

        // 토큰이 없는 경우(Security Filter에서 없는 경우는 어차피 걸러질 것이지만 혹시나를 대비)
        if (refreshToken == null) {
            log.error("SecurityException: [JWT 토큰 재발급] header의 Authorization에 refresh 토큰이 없습니다.");
            throw new SecurityException("해당 경로로 접근할 수 있는 권한이 없습니다.");
        }

        JwtTokenDto newJwtToken = userService.reissueToken(refreshToken);

        Map<String, Object> response = new HashMap<>();
        response.put("msg", "Success");
        response.put("data", newJwtToken);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}