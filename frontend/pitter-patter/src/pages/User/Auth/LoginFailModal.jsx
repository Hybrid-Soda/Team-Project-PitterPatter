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
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background-color: var(--box-yellow-color);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
`;

const ModalImg = styled.img`
  width: 10vw;
`

import loginFail from '/src/assets/img/User/loginFail.png';

function LoginFailModal({ message, onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalImg src={loginFail} alt="fail-icon" />
        <ModalMessage>{message}</ModalMessage>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

export default LoginFailModal;
