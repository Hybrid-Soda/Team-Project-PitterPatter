import React from 'react';
import styled from 'styled-components';

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
  border-radius: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 15vh;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background-color: var(--box-pink-color);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  font-size: 1.1rem;
  font-weight: bold;
`;

function Modal({ message, onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>{message}</ModalMessage>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
