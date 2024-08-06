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
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

const ModalImg = styled.img`

`

function CoinModal({ onClose }) {
  const navigate = useNavigate();
  const goAttendance = () => {
    navigate('/attendance');
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalImg src={Coin} /> + 10
        <h2>출석 보상이 지급되었습니다.</h2>
        <CloseButton onClick={onClose}>계속 하기</CloseButton>
        <CloseButton onClick={goAttendance()}>확인하러 가기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CoinModal;
