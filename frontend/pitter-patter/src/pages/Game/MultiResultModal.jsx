import styled from 'styled-components';

import Win from "/src/assets/img/Game/win.png";
import Lose from "/src/assets/img/Game/lose.png";
import Draw from "/src/assets/img/Game/draw.png";
import Wait from "/src/assets/img/Game/wait.png";

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
  padding: 5vh 10vw;
  border-radius: 10px;
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
  margin-top: 1rem;
  box-shadow: 0px 5px 0px 0px var(--logo-yellow-color);
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: translateY(1px);
    box-shadow: 0px 4px 0px 0px var(--logo-yellow-color);
  }

  &:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px var(--logo-yellow-color);
  }
`;

const ModalImg = styled.img`
  width: 15vw; /* 필요에 따라 크기를 조절하세요 */
  margin-bottom: 1rem;
`;

function MultiResultModal({ onClose, myScore, rivalScore, isGameEnd }) {

  return (
    <ModalOverlay>
      { isGameEnd ?
        <ModalContent>
          <ModalImg src={myScore > rivalScore ? Win : myScore < rivalScore ? Lose : Draw} alt="Result" />
          <h2>{myScore > rivalScore ? '승리!' : myScore < rivalScore ? '패배...' : '무승부!'}</h2>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <CloseButton onClick={onClose}>돌아가기</CloseButton>
          </div>
        </ModalContent>
        :
        <ModalContent>
          <h2>상대방의 게임 종료를 기다리는중...</h2>
          <ModalImg src={Wait} alt="Wait" />
        </ModalContent>
      }
    </ModalOverlay>
  );
}

export default MultiResultModal;
