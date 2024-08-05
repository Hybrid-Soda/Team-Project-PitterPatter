import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import userdelete from "../../../assets/img/User/userdelete.png";

import { 
    LayoutBase, 
    // LayoutModal, 
    LayoutTitle, 
} from '../SFA/ForgotPWmodalStyle';

const DeleteUserImage = styled.img`
    width: 10vw;
    margin-bottom: 2rem;
`;

const LayoutModal = styled.div`
    width: 40vw;
    height: 50vh;
    background-color: white;
    border-radius: 3.5rem;
    box-shadow: 0px 4px 16.5px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;    
`

const SubmitButton = styled.button`
    border-radius: 1.5rem;
    background-color: #FFD8DF;
    box-shadow: #FA6DA1 0 .6vh;
    font-size: 1.2rem;
    height: 5vh;
    padding: .5rem 1.5rem;
`

function DeleteUser({ onClose }) {
    return(
        <LayoutBase style={{ top:'0', left: '0', zIndex: 10 }} onClick={onClose}>
            <LayoutModal onClick={(e) => e.stopPropagation()}>
                <DeleteUserImage src={userdelete} alt="userdelete" />
                <LayoutTitle style={{ marginBottom: '1rem' }}>탈퇴가 완료되었습니다.</LayoutTitle>
                <Link to='/' style={{ height: '10%' }}><SubmitButton>메인으로</SubmitButton></Link>
            </LayoutModal>
        </LayoutBase>
    );
}


export default DeleteUser;
