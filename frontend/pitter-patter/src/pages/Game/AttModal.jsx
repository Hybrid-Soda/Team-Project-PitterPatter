import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Coin from '/src/assets/icons/Coin.png';

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: var(--box-yellow-color);
  border-radius: 21px;
  width: fit-content;
  padding: .3rem 1rem;
  font-size: 1rem;
  box-shadow: 0px 5px 0px 0px var(--logo-yellow-color);
`;

const ModalImg = styled.img`
  width: 5vw; /* 필요에 따라 크기를 조절하세요 */
  height: 5vw; /* 필요에 따라 크기를 조절하세요 */
  margin-bottom: 1rem;
`;

function AttModal({ onClose }) {
  const navigate = useNavigate();

  const goAttendance = () => {
    navigate('/attendance');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalImg src={Coin} alt="Coin" />
        <h2>출석 보상이 지급되었습니다.</h2>
        <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '1rem', marginTop: '1rem'}}>
          <CloseButton onClick={onClose} style={{ backgroundColor: 'var(--background)', boxShadow: '0px 5px 0px 0px lightgray' }}>계속 하기</CloseButton>
          <CloseButton onClick={goAttendance}>확인하러 가기</CloseButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AttModal;
