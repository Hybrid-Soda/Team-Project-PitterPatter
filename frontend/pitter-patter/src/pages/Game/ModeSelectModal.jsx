import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ModalButton = styled(Link)`
  background-color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  display: flex;
  flex-direction: column; 
  gap: 2rem;
  width: 15vw;
  height: 20vh;
  border-radius: 2rem;

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #FFE65C;
    transition: background-color 0.3s ease-in-out;
    font-weight: bold;
  }
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  margin-top: 1rem;
`;

const ButtonImg = styled.img`
    width: 45%;
`

const ModalContext = styled.p`
    font-size: 1.2rem;
`;

import multimode from '/src/assets/img/Game/multimode.png';
import singlemode from '/src/assets/img/Game/singlemode.png';

function ModeSelectModal({ onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>게임 모드를 선택하세요</ModalTitle>
        <ButtonGroup>
          <ModalButton to="/game">
            <ButtonImg src={singlemode} alt="singlemode" />
            <ModalContext>싱글 플레이</ModalContext>
          </ModalButton>
          <ModalButton to="/game/multi">
            <ButtonImg src={multimode} alt="multimode" />
            <ModalContext>멀티 플레이</ModalContext>
          </ModalButton>
        </ButtonGroup>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ModeSelectModal;
