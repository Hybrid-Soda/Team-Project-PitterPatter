import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutBase, 
    LayoutModal, 
    LayoutTitle, 
    LayoutContext,
    LayoutInput,
    EmailInput,
    SubmitButton,
    NoButton,
} from './ForgotSFAmodalStyle';
import Loader from "../../Components/loader.jsx";

import { sendReset2faEmail } from "/src/pages/User/userApi.js";

function ForgotSFAModal({ onClose, onMessage }) {
    const navigator = useNavigate();
    
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const emailInputRef = useRef(null);

    // email이 변경될 때 마다 호출
    useEffect(() => {
        setEmailValid(isEmailValid(email));
      }, [email]);

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        // 이메일은 필수 입력값임
        if (email === '') {
            onMessage("이메일을 입력해주세요.");
            emailInputRef.current.focus();
            return;
        }

        if (!emailValid) {
            onMessage("이메일 형식이 올바르지 않습니다.");
            emailInputRef.current.focus();
            return;
        }

        try {
            setTimeout(() => {
                setIsLoading(true);
              }, 100);
            const respone = await sendReset2faEmail(email);
            
            if (respone.status === 200) {
                setIsLoading(false);
                const msg = respone.data.msg;
                onMessage(msg);
                onClose();
            } else {
                setIsLoading(false);
                onMessage("메일 발송에 실패했습니다.");
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 400) {
                onMessage("메일 발송에 실패했습니다.");
            }
            else {
                onMessage("문제가 발생했습니다. 다시 시도해주세요.");
            }
        }
    }

    return(
        <LayoutBase onClick={onClose}>
            {isLoading ? <Loader /> : 
            <LayoutModal onClick={(e) => e.stopPropagation()}>
                <LayoutTitle>이메일을 입력해주세요.</LayoutTitle>
                <LayoutContext>아래 주소로 2차 비밀번호 변경 링크를 보내드립니다.</LayoutContext>
                <LayoutInput>
                    <EmailInput
                        placeholder='이메일'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailInputRef}
                    />
                    <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
                    <NoButton onClick={onClose}>취소</NoButton>
                </LayoutInput>
            </LayoutModal>
            }
        </LayoutBase>
    );
}

export default ForgotSFAModal;
