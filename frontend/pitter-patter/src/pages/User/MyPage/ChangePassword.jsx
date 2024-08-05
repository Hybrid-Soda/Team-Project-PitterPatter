import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
            {newPassword !== confirmPassword && confirmPassword !== "" && (
            <WarningMessage>새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.</WarningMessage>
            )}
        </div>
      </InputWrap>
      <ButtonWrap>
        <CancleButton>취소</CancleButton>
        <SubmitButton>저장</SubmitButton>
      </ButtonWrap>
    </LayoutMyPage>
  );
}

export default ChangePassword;
