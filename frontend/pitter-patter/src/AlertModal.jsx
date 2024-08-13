import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    &:hover {
      background-color: #0056b3;
    }
    &:first-child {
      background-color: #28a745;
      &:hover {
        background-color: #218838;
      }
    }
  }
`;

const AlertModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>로그인이 필요합니다</h2>
        <p>이 페이지에 접근하려면 로그인이 필요합니다. 로그인하시겠습니까?</p>
        <ModalActions>
          <button onClick={onConfirm}>로그인 하러 가기</button>
          <button onClick={onClose}>닫기</button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlertModal;
