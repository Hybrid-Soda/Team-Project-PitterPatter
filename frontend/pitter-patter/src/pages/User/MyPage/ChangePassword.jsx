import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  resetPasswordByUserId,
  reissueJwtToken,
  verifyPassword
 } from "/src/pages/User/userApi.js";

const LayoutMyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1vw;
  /* background-color: red; */
  margin-top: 50%;
`;

const InputItem = styled.div`
  /* margin-top: 0.5vw; */
  width: 30vw;
  /* height: 100%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputTitle = styled.span`
  font-size: 1.2vw;
  color: #616161;
`;

const InputBox = styled.input`
  width: 15vw;
  padding: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const WarningMessage = styled.div`
  font-size: 1vw;
  color: var(--logo-pink-color);
`;

const ButtonWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-top: 20%;
    gap: 1vw;
`

const SubmitButton = styled.button`
    border-radius: 1.5rem;
    background-color: #FFD8DF;
    box-shadow: #FA6DA1 0 .6vh;
    font-size: 1.2rem;
    height: 5vh;
    padding: .5rem 1.8rem;
`

const CancleButton = styled.button`
    font-size: 1.2rem;
    color: var(--font-color);
    /* padding-bottom: .3rem; */
`

function ChangePassword() {
  const navigator = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 추후 redux에서 가져와야할 정보들
  const [accessToken, setAccessToken] = useState('access token');
  const [refreshToken, setRefreshToken] = useState('refresh token');

  const isNewPasswordValid = newPassword === confirmPassword;

  const handleCancel = async () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  const handleSubmit = async () => {
    // 현재 비밀번호는 필수
    if (currentPassword === "" || currentPassword === undefined) {
      alert("현재 비밀번호를 입력해주세요.");
      return;
    }

    // 새 비밀번호는 필수
    if (newPassword === "" || currentPassword === undefined) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }

    // 새 비밀번호 확인 일치는 필수
    if (!isNewPasswordValid) {
      alert("새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 현재 비밀번호 검증
    const isPasswordVerify = await checkCurrentPassword();
    if (isPasswordVerify === "reissue") {
      const isCompleted = await doReissue();
          if (isCompleted) {
            alert("토큰이 재발급되었으니 다시 시도해보세욥");
          } else {
            // TODO: 로그아웃 처리
            alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
            navigator("/login");
            return;
          }
      return;
    } else if (isPasswordVerify === "false") {
      return;
    }

    // 비밀번호 재설정
    try {
      const response = await resetPasswordByUserId(accessToken, newPassword);
      
      if (response.status === 200) {
        const msg = response.data.msg;
        alert(msg);
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // 토큰 재발급 후 다시 요청
          const isCompleted = await doReissue();

          if (isCompleted) {
            alert("토큰이 재발급되었으니 다시 시도해보세욥");
          } else {
            // TODO: 로그아웃 처리
            alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
            navigator("/login");
          }
          return;
        }
      }
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      handleError(error);
    }

  };

  const checkCurrentPassword = async () => {
    try {
      const response = await verifyPassword(accessToken, currentPassword);

      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.msg;

        if (exception === undefined) {
          return "true";
        } else {
          alert(msg);
          return "false";
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return "reissue";
        }
        return "false";
      }
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      handleError(error);
      return "false";
    }
  }

  const doReissue = async () => {
    try {
      const response = await reissueJwtToken(refreshToken);

      if (response.status === 200) {
        const exception = response.data.exception;

        if (exception === undefined) {
          const reissuedJwtToken = response.data.data;
          
          // 재발급한 JWT 토큰을 redux에 저장
          // ...
          
          setAccessToken(reissuedJwtToken.accessToken);
          setRefreshToken(reissuedJwtToken.refreshToken);

          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      handleError(error);
      return false;
    }
  }

  const handleError = (error) => {
    // 오류 처리
    if (error.response) {
     // 서버가 응답을 반환했지만 상태 코드가 2xx 범위가 아님
     console.error('Error Response Status:', error.response.status);
     console.error('Error Response Data:', error.response.data);
     console.error('Error Response Headers:', error.response.headers);
   } else if (error.request) {
     // 요청은 성공적으로 전송되었지만 응답을 받지 못함
     console.error('Error Request:', error.request);
   } else {
     // 요청 설정에서 발생한 오류
     console.error('Error Message:', error.message);
   }
 };

  return (
    <LayoutMyPage>
      <InputWrap>
        <InputItem>
          <InputTitle>현재 비밀번호</InputTitle>
          <InputBox 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
          />
        </InputItem>
        <InputItem>
          <InputTitle>새 비밀번호</InputTitle>
          <InputBox 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </InputItem>        
        <InputItem>
          <InputTitle>새 비밀번호 확인</InputTitle>
          <InputBox 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </InputItem>
        <div style={{height: '5vh'}}>
            {!isNewPasswordValid && (
            <WarningMessage>새 비밀번호 확인이 일치하지 않습니다.</WarningMessage>
            )}
        </div>
      </InputWrap>
      <ButtonWrap>
        <CancleButton onClick={handleCancel}>취소</CancleButton>
        <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
      </ButtonWrap>
    </LayoutMyPage>
  );
}

export default ChangePassword;
