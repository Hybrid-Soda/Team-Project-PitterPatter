import React from 'react';
import { useState, useEffect, useRef } from 'react';
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
import Modal from '../../Components/modal';
import Loader from "../../Components/loader.jsx";
import { useSearchParams } from 'react-router-dom';
import Header from "../../LandingPage/Header"

import {
    verifyEmailTokenForReset2fa,
    reset2faByEmailToken,
} from "/src/pages/User/userApi.js";

function ResetSFA() {
    const navigator = useNavigate();
    const [searchParams] = useSearchParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMessage, setModalMessage] = useState(''); 
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const newPasswordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    const emailToken = searchParams.get("token");
    const email = searchParams.get("email");

    const isPasswordValid = newPassword === confirmPassword && newPassword !== "";

    // 컴포넌트가 마운트될 때 호출
    useEffect(() => {
        const checkToken = async () => {
            const isValid = await isVerifiedEmailToken();
      
            if (!isValid) {
                navigator('/expired');
            }
        };
      
        checkToken();
    }, []); // 빈 배열을 두 번째 인수로 전달하여 마운트 시 한 번만 실행되도록 함.

    const handleResetSFA = async () => {
        // 새 2차 비밀번호는 필수 입력 값임.
        if (newPassword === "" || newPassword === undefined) {
            openModal("새 2차 비밀번호를 입력해주세요.");
            return;
        }

        try {
            setTimeout(() => {
                setIsLoading(true);
              }, 100);
            const response = await reset2faByEmailToken(email, emailToken, newPassword);
            if (response.status === 200) {
                setIsLoading(false);
                const exception = response.data.exception;
                const msg = response.data.msg;

                if (exception === undefined) {
                    openModal(msg);
                } else {
                    openModal(msg);
                }
            } else {
                setIsLoading(false);
                openModal("2차 비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            setIsLoading(false);
            openModal("문제가 발생했습니다. 다시 시도해주세요.");
        }
    }

    const isVerifiedEmailToken = async () => {
        try {
            setTimeout(() => {
                setIsLoading(true);
              }, 100);
            const response = await verifyEmailTokenForReset2fa(email, emailToken);
            if (response.status === 200) {
                setIsLoading(false);
                const exception = response.data.exception;

                if (exception === undefined) {
                    return true;
                } else {
                    return false;
                }
            } else {
                setIsLoading(false);
                return false;
            }
        } catch (error) {
            setIsLoading(false);
            return false;
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (modalMessage === "2차 비밀번호 재설정이 성공적으로 완료되었습니다.") {
            navigator("/login");
        } else if (modalMessage === "유효하지 않은 토큰입니다." || modalMessage === "해당 사용자가 존재하지 않습니다.") {
            navigator("/expired");
        } else if (modalMessage === "새 2차 비밀번호를 입력해주세요.") {
            newPasswordInputRef.current.focus();
        }
    }

    const openModal = (msg) => {
        setModalMessage(msg);
        setIsModalOpen(true)
    }

    return (
    <Layoutbody>
        <Header />
        {isLoading ? <Loader /> : 
        <LayoutContext>
            <WrapContext>   
                <Title>2차 비밀번호 변경하기</Title>
                <span style={{marginBottom: '2vh'}}>{email}의 비밀번호를 변경합니다.</span>
                <Password type="password" placeholder="새로운 2차 비밀번호"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    ref={newPasswordInputRef}
                />
                <Password type="password" placeholder="새로운 2차 비밀번호를 한번 더 입력해주세요."
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ref={confirmPasswordInputRef}
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
            {isModalOpen && (
                <Modal title="알림" onClose={closeModal}>
                    {modalMessage}
                </Modal>
            )}
        </LayoutContext>
        }
    </Layoutbody>
    )
}

export default ResetSFA;
