import React from 'react';
import { 
    LayoutBase, 
    LayoutModal, 
    LayoutTitle, 
    LayoutContext,
    LayoutInput,
    // EmailInput,
    SubmitButton,
    NoButton,
} from './ForgotPWmodalStyle';

function ForgotPWModal({ onClose }) {
    return(
        <LayoutBase onClick={onClose}>
            <LayoutModal onClick={(e) => e.stopPropagation()}>
                <LayoutTitle>2차 비밀번호를 변경하시겠습니까?</LayoutTitle>
                <LayoutContext>등록하신 이메일 주소로 비밀번호 변경 링크를 보내드립니다.</LayoutContext>
                <LayoutInput>
                    {/* <NoButton>다음에 할게요.</NoButton> */}
                    <SubmitButton>메일 받기</SubmitButton>
                </LayoutInput>
            </LayoutModal>
        </LayoutBase>
    );
}

export default ForgotPWModal;
