import React from 'react';
import { useState } from 'react';
import {
    Layoutbody,
    LayoutContext,
    WrapContext,
    Title,
    Password,
    WarningMessage,
    SubmitButton
  } from './ResetPasswordStyle';
import Header from "../../LandingPage/Header"

function ResetPassword() {
    const email = "example@example.com"

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isPasswordValid = newPassword === confirmPassword && newPassword !== "";

    return (
    <Layoutbody>
        <Header />
        <LayoutContext>
            <WrapContext>   
                <Title>비밀번호 변경하기</Title>
                <span style={{marginBottom: '2vh'}}>{email}의 비밀번호를 변경합니다.</span>
                <Password type="password" placeholder="새로운 비밀번호"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
                <Password type="password" placeholder="새로운 비밀번호를 한번 더 입력해주세요."
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                
                <div style={{height: '5vh'}}>
                    {newPassword !== confirmPassword && confirmPassword !== "" && (
                    <WarningMessage>새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.</WarningMessage>
                    )}
                </div>

                <SubmitButton isValid={isPasswordValid} onClick={() => {
                    // axios
                }}>변경하기</SubmitButton>
            </WrapContext>
        </LayoutContext>
    </Layoutbody>
    )
}

export default ResetPassword;
