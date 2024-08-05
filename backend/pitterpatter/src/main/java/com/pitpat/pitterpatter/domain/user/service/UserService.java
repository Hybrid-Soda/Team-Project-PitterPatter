package com.pitpat.pitterpatter.domain.user.service;

import com.pitpat.pitterpatter.domain.user.model.dto.*;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Email;

public interface UserService {

    // ===================== 로그인 관련 ==========================
    // email 유저 로그인
    public JwtTokenDto emailLogin(String email, String password);

    // ===================== 회원가입 관련 ========================
    // email 유저 회원가입
    public UserDto emailSignUp(EmailUserSignUpDto signUpDto);
    // email 유저 이메일 중복 체크
    public boolean isEmailAlreadyInUse(String email);
    // email, social 유저 팀 이름 중복 체크
    public boolean isTeamNameAlreadyInUse(String teamName);

    // ====================== 조회, 변경, 탈퇴, 검증 ==========================
    // jwt 토큰에서 userId 값을 꺼내와 회원정보 조회
    public UserDto getUserById(int userId);
    // jwt 토큰에서 userId 값을 꺼내와 회원정보 변경
    public UserDto updateUserById(int userId, AdditionalUserInfoDto updatedUser);
    // jwt 토큰에서 userId 값을 꺼내와 비밀번호 재설정
    public void resetPassword(int userId, PasswordDto passwordDto);
    // 비밀번호 재설정 메일 발송을 위한 토큰 생성
    public String createEmailToken(EmailDto emailDto);
    // 비밀번호 재설정 메일 발송
    public void sendEmail(EmailDto emailDto, String subject, String text) throws MessagingException;
    // jwt 토큰에서 userId 값을 꺼내와 2차 비밀번호 검증
    public void verify2fa(int userId, TwoFaDto twoFaDto);
    // jwt 토큰에서 userId 값을 꺼내와 회원 탈퇴
    public void deleteUser(int userId);
    // acccess token, refresh token 재발급 요청
    public JwtTokenDto reissueToken(String refreshToken);
    // redis에 저장된 refresh 토큰과 맞는지 검증
    public void verifyRefreshToken(String refreshToken, String userId);

    // ====================== 기타 ============================
    // 팀 이름 생성기를 이용하여 db에 없는 유니크한 팀 이름 반환
    public String getUniqueTeamName();
    // 입력으로 들어온 password가 유효한 지 한번 더 확인
    public void isValidPassword(String password);
    // Request Header에서 토큰 정보 추출
    public String resolveRefreshToken(HttpServletRequest request);
    // 암호화
    public String encode(String text);
}
