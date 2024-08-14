import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import userdelete from "../../../assets/img/User/userdelete.png";
import { useDispatch } from 'react-redux';
import { clearChild } from '../../../redux/childSlice';
import { clearToken } from '../../../redux/tokenSlice';
import { 
    LayoutBase, 
    // LayoutModal,
    LayoutTitle, 
} from '../SFA/ForgotSFAmodalStyle';
import Modal from '../../Components/modal';

import { deleteUser} from "/src/pages/User/userApi.js";

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
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [modalMessage, setModalMessage] = useState(''); 
    const {accessToken } = useSelector((state) => state.token);

    useEffect(() => {
        const handleDeleteUser = async () => {
            const isDeleted = await doDeleteUser();
            // const isDeleted = true;
            if (isDeleted) {
                dispatch(clearChild());
                dispatch(clearToken());
            }
        };

        handleDeleteUser();
    }, []);

    const doDeleteUser = async () => {
        try {
          const response = await deleteUser(accessToken);
    
          if (response.status === 200) {
            const exception = response.data.exception;
            const msg = response.data.exception;
    
            if (exception === undefined) {
              return true;
            } else {
                openModal(msg);
                return false;
            }
          } else {
            openModal("회원탈퇴에 실패했습니다.");
            return false;
          }
        } catch (error) {
            if (!(error.response && error.response.status === 401) && !(error.msg && error.msg === "토큰 검증 실패")) {
                openModal("문제가 발생했습니다. 다시 시도해주세요.");
            }
          return false;
        }
    };

    const openModal = (msg) => {
        setModalMessage(msg);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (modalMessage === "해당 사용자가 존재하지 않습니다." || modalMessage === "회원탈퇴에 실패했습니다." || modalMessage === "문제가 발생했습니다. 다시 시도해주세요.") {
          navigator("/mypage");
        }
    };

    return(
        <LayoutBase style={{ top:'0', left: '0', zIndex: 10 }} onClick={onClose}>
            <LayoutModal onClick={(e) => e.stopPropagation()}>
                <DeleteUserImage src={userdelete} alt="userdelete" />
                <LayoutTitle style={{ marginBottom: '1rem' }}>탈퇴가 완료되었습니다.</LayoutTitle>
                <Link to='/' style={{ height: '10%' }}><SubmitButton>메인으로</SubmitButton></Link>
            </LayoutModal>
            {isModalOpen && (
                <Modal title="알림" onClose={closeModal}>
                    {modalMessage}
                </Modal>
            )}
        </LayoutBase>
    );
}


export default DeleteUser;
