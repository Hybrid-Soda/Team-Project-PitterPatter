import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Layoutbody,
    LayoutContext,
    WrapContext,
    Title,
    Password,
    WarningMessage,
    SubmitButton
  } from './ResetPasswordStyle';
import { useSearchParams } from 'react-router-dom';
import Header from "../../LandingPage/Header"

import {
    verifyEmailTokenForReset2fa,
    reset2faByEmailToken,
} from "/src/pages/User/userApi.js";

function ResetSFA() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const emailToken = searchParams.get("token");
    const email = searchParams.get("email");

    const isPasswordValid = newPassword === confirmPassword && newPassword !== "";

    // 컴포넌트가 마운트될 때 호출
    useEffect(() => {
        const checkToken = async () => {
            const isValid = await isVerifiedEmailToken();
      
            if (!isValid) {
              navigate('/expired');
            }
        };
      
        checkToken();
    }, []); // 빈 배열을 두 번째 인수로 전달하여 마운트 시 한 번만 실행되도록 함.

    const handleResetSFA = async () => {
        // 새 2차 비밀번호는 필수 입력 값임.
        if (newPassword === "" || newPassword === undefined) {
            alert("새 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const response = await reset2faByEmailToken(email, emailToken, newPassword);
            if (response.status === 200) {
                const exception = response.data.exception;
                const msg = response.data.msg;

                if (exception === undefined) {
                    alert(msg);
                    navigate("/");
                } else {
                    alert(msg);
                    if (exception === "NoSuchElementException" || msg === "유효하지 않은 토큰입니다.") {
                        navigate("/expired");
                    }
                }
            } else {
                alert("2차 비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            alert("문제가 발생했습니다. 다시 시도해주세요.");
            handleError(error);
        }
    }

    const isVerifiedEmailToken = async () => {
        try {
            const response = await verifyEmailTokenForReset2fa(email, emailToken);
            if (response.status === 200) {
                const exception = response.data.exception;

                if (exception === undefined) {
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
    };

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
    <Layoutbody>
        <Header />
        <LayoutContext>
            <WrapContext>   
                <Title>2차 비밀번호 변경하기</Title>
                <span style={{marginBottom: '2vh'}}>{email}의 비밀번호를 변경합니다.</span>
                <Password type="password" placeholder="새로운 2차 비밀번호"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                />
                <Password type="password" placeholder="새로운 2차 비밀번호를 한번 더 입력해주세요."
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                
                <div style={{height: '5vh'}}>
                    {newPassword !== confirmPassword && confirmPassword !== "" && (
                    <WarningMessage>비밀번호가 일치하지 않습니다.</WarningMessage>
                    )}
                </div>

                <SubmitButton isvalid={isPasswordValid} onClick={handleResetSFA}>
                    변경하기
                </SubmitButton>
            </WrapContext>
        </LayoutContext>
    </Layoutbody>
    )
}

export default ResetSFA;
