import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(Link)`
  background-color: #ccc;
  color: black;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  /* margin-top: 1rem; */
`;

const ModalContext = styled.p`
    font-size: 1.2rem;
    margin: 2rem 0;
`;

const NumberInput = styled.input`
    width: 10vw;
    height: 5vh;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
    
    // input type number의 화살표 숨기기
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const InputGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-direction: row;
`;

const ConfirmButton = styled.button`
    background-color: var(--logo-blue-color);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
    height: 5vh;
`;

const CreateRoomButton = styled.button`
    background-color: var(--logo-blue-color);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
    /* margin-top: 1rem; */
    font-size: 1rem;
`;

const RoomNumber = styled.span`
    font-size: 1.5rem;
    margin: 1rem 1rem;
    color: #FF6B6B;
    font-weight: bold;
`;


function MultiSelectModal({ onClose, onJoinRoom, onCreateRoom, isWaiting, roomId }) {
  const [roomNumber, setRoomNumber] = useState('');

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleJoinRoom = () => {
    if (onJoinRoom && roomNumber.length === 6) {
      onJoinRoom(roomNumber);
    } 
  };

  const handleCreateRoom = () => {
    if (onCreateRoom) {
      onCreateRoom();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {isWaiting ? <>
          <ModalTitle>상대방을 기다리는중입니다.</ModalTitle>
          <ModalContext>방 번호:
            <RoomNumber>{roomId}</RoomNumber>
          </ModalContext>
          <CloseButton to="/game/select-mode">이전 페이지로 돌아가기</CloseButton>
        </> :
          <>
            <ModalTitle>방 번호를 입력 해주세요</ModalTitle>
          <InputGroup>
            <NumberInput type="text" placeholder="방 번호" maxLength="6" pattern="[0-9]*" value={roomNumber} onChange={handleRoomNumberChange} />
            <ConfirmButton onClick={handleJoinRoom}>입장하기</ConfirmButton>
          </InputGroup>
          <ModalContext>혹은</ModalContext>
          <ButtonGroup>
            <CreateRoomButton onClick={handleCreateRoom}>내가 방 만들기</CreateRoomButton>
            <CloseButton to="/game/select-mode">이전 페이지로 돌아가기</CloseButton>
          </ButtonGroup>
          </>}
      </ModalContent>
    </ModalOverlay>
  );
}

export default MultiSelectModal;
