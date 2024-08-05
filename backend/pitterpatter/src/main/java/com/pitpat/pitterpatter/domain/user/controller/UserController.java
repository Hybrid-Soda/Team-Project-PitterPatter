package com.pitpat.pitterpatter.domain.user.controller;

import com.pitpat.pitterpatter.domain.user.model.dto.*;
import com.pitpat.pitterpatter.domain.user.service.UserService;
import com.pitpat.pitterpatter.global.exception.user.DuplicateResourceException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.NavigableMap;
import java.util.NoSuchElementException;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    // =================== 로그인 관련 ===========================
    // email 유저 로그인 메서드
    @PostMapping("/login/email")
    public ResponseEntity<JwtTokenDto> emailLogin(@RequestBody LoginDto loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        JwtTokenDto jwtToken = userService.emailLogin(email, password);
        log.info("request email = {}, password = {}", email, password);
        log.info("jwtToken accessToken = {}", jwtToken.getAccessToken());

        return ResponseEntity.status(HttpStatus.OK).body(jwtToken);
    }

    // TODO: 테스트 완료되면 추후 지울 것
    @GetMapping("/home")
    public String home() {
        return "home";
    }


    // ============================= 회원가입 관련 ================================
    // email 유저 회원가입
    @PostMapping("/email")
    public ResponseEntity<?> emailSignUp(@RequestBody EmailUserSignUpDto emailUserSignUpDto) {
        try {
            UserDto savedUserDto = userService.emailSignUp(emailUserSignUpDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUserDto);
        } catch (DuplicateResourceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // email 유저 이메일 중복 체크
    @GetMapping("/check/email")
    public ResponseEntity<String> isEmailAlreadyInUse(@RequestParam(name = "email") String email) {
        try {
            userService.isEmailAlreadyInUse(email);
            return ResponseEntity.status(HttpStatus.OK).body(email + " is available.");
        } catch (DuplicateResourceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // email, social 유저 팀 이름 중복 체크
    @GetMapping("/check/teamname")
    public ResponseEntity<String> isTeamNameAlreadyInUse(@RequestParam(name = "teamname") String teamName) {
        try {
            userService.isTeamNameAlreadyInUse(teamName);
            return ResponseEntity.status(HttpStatus.OK).body(teamName + " is available.");
        } catch (DuplicateResourceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    // ====================== 조회, 변경, 탈퇴, 검증 ==========================
    // jwt 토큰에서 userId 값을 꺼내와 회원정보 조회
    @GetMapping
    public ResponseEntity<?> getUserById(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            int userId = Integer.parseInt(userDetails.getUsername());
            UserDto userDto = userService.getUserById(userId);
            return ResponseEntity.ok(userDto);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // jwt 토큰에서 userId 값을 꺼내와 회원정보(2차 비밀번호, 팀 이름) 변경
    @PatchMapping
    public ResponseEntity<?> updateUserById(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AdditionalUserInfoDto updatedUser) {
        try {
            int userId = Integer.parseInt(userDetails.getUsername());
            UserDto userDto = userService.updateUserById(userId, updatedUser);
            return ResponseEntity.ok(userDto);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DuplicateResourceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // jwt 토큰에서 email 값을 꺼내와 비밀번호 재설정
    @PatchMapping("/password/reset")
    public ResponseEntity<String> resetPassword(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PasswordDto passwordDto) {
        try {
            int userId = Integer.parseInt(userDetails.getUsername());
            userService.resetPassword(userId, passwordDto);
            return ResponseEntity.ok("Password update completed successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // TODO: 이메일 토큰이 들어오면 맞는 토큰인지 검증하도록 바꾸기
    // 이메일 토큰이 맞는지 검증
    @GetMapping("/password/reset")
    public ResponseEntity<?> viewResetPassword (@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.OK).body(userDetails.getUsername() + "님의 비밀번호 변경 페이지");
    }

    // 비밀번호 재설정 메일 발송
    @PostMapping("/password/reset_token")
    public ResponseEntity<?> sendMailForResetPassword (@RequestBody EmailDto emailDto) {
        try {
            // 이메일 토큰 생성
            String emailToken =  userService.createEmailToken(emailDto);

            // TODO: 이메일 토큰 암호화?
            
            // 메일 발송
            String resetUrl = "http://localhost:8080/api/user/password/reset?token=" + emailToken;
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

            return ResponseEntity.ok("Password reset email sent.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // jwt 토큰에서 userId 값을 꺼내와 2차 비밀번호 검증
    @PostMapping("/verify_2fa")
    public ResponseEntity<String> verify2fa(@AuthenticationPrincipal UserDetails userDetails, @RequestBody TwoFaDto twoFaDto) {
        try {
            int userId = Integer.parseInt(userDetails.getUsername());
            userService.verify2fa(userId, twoFaDto);
            return ResponseEntity.status(HttpStatus.OK).body("2FA verified successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // TODO: 예외 처리 구체적으로
    // jwt 토큰에서 userId 값을 꺼내와 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            int userId = Integer.parseInt(userDetails.getUsername());
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // acccess token, refresh token 재발급 요청
    // (Refresh Token Rotation을 위해 access 토큰이 만료될 때 refresh token도 같이 새로 발급)
    @PatchMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) {
        try {
            // Request Header에서 토큰 정보 추출
            String refreshToken = userService.resolveRefreshToken(request);

            // 토큰이 없는 경우(Security Filter에서 없는 경우는 어차피 걸러질 것이지만 혹시나를 대비)
            if (refreshToken == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("JWT Token missing");
            }

            JwtTokenDto newJwtToken = userService.reissueToken(refreshToken);
            return ResponseEntity.status(HttpStatus.OK).body(newJwtToken);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}

