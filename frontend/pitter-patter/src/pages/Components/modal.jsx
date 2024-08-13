import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: var(--box-yellow-color);
  border: none;
  font-size: 1rem;
  font-weight: bold;
  padding: .5rem 1rem;
  border-radius: 10rem;
  box-shadow: 0 5px 0 0 var(--logo-yellow-color);
  transition: ease-in-out 0.1s;

  &:hover {
    box-shadow: 0 4px 0 0 var(--logo-yellow-color);
    transform: translateY(1px);
  }

  &:active:not(:disabled) {
    box-shadow: 0 0 0 0 var(--logo-yellow-color);
    transform: translateY(2px);
  }
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Modal = ({ title, children, onClose, transparent }) => {
  return (
    <ModalOverlay transparent={transparent}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
