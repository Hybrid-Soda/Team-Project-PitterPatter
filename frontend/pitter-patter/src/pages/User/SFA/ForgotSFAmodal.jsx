import React, { useState, useEffect } from 'react';
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

import { sendReset2faEmail } from "/src/pages/User/userApi.js";

function ForgotSFAModal({ onClose }) {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);

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
            alert("이메일을 입력해주세요.");
            return;
        }

        if (!emailValid) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }

        try {
            const respone = await sendReset2faEmail(email);
            
            if (respone.status === 200) {
                const msg = respone.data.msg;
                alert(msg);
                onClose();
            } else {
                alert("메일 발송에 실패했습니다.");
            }
        } catch (error) {
            if (error.response.status === 400) {
                alert("메일 발송에 실패했습니다.");
            }
            else {
                alert("문제가 발생했습니다. 다시 시도해주세요.");
            }
            handleError(error);
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

    return(
        <LayoutBase onClick={onClose}>
            <LayoutModal onClick={(e) => e.stopPropagation()}>
                <LayoutTitle>이메일을 입력해주세요.</LayoutTitle>
                <LayoutContext>아래 주소로 2차 비밀번호 변경 링크를 보내드립니다.</LayoutContext>
                <LayoutInput>
                    <EmailInput
                        placeholder='이메일'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <SubmitButton onClick={handleSubmit}>전송</SubmitButton>
                    <NoButton onClick={onClose}>취소</NoButton>
                </LayoutInput>
            </LayoutModal>
        </LayoutBase>
    );
}

export default ForgotSFAModal;
