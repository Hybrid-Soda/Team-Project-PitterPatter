import React from 'react';
import { LayoutBody, LayoutInModal, ModalIcon, Title, Context, Button } from '../../style/modalStyle';
import warningSign from '/src/assets/icons/warningSign.png';
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

function IsReady({onClose}) {
  return (
    <ModalOverlay>
      <LayoutBody>
        <LayoutInModal>
          <ModalIcon src={warningSign} alt="Warning Sign" />
        </LayoutInModal>
        <LayoutInModal>
          <Title>스트레칭은 하셨나요?</Title>
        </LayoutInModal>
        <LayoutInModal>
          <Context>안전한 진행을 위해 충분한 몸풀기 운동을 권장합니다.</Context>
        </LayoutInModal>
        <LayoutInModal style={{ marginTop: "10px" }}>
          <Button onClick={onClose}>시작</Button>
        </LayoutInModal>
      </LayoutBody>
    </ModalOverlay>
  );
}

export default IsReady;
