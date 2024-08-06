import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const OuterBox = styled.div`
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50vh; 
  background-color: var(--box-yellow-color);
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  box-shadow: 0px -3px 33.4px 0px rgba(0, 0, 0, 0.25);
  user-select: none;
`;

export const RankBarOverlay = styled.div`
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const InnerBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 2vw;
  width: 96vw;
  height: 45vh;
  background-color: #fff;
  border-top-left-radius: 55px;
  border-top-right-radius: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RankWrap = styled.div`
  width: 70%;
  padding: 2.5vh 2vw;
  padding-right: 10vw;
  /* margin: 1vw 0; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #d9d9d9; */
  border-bottom: 1px solid #ccc; /* 구분선 추가 */
  font-size: 1.5vw;

  &:last-child {
    border-bottom: none; /* 마지막 요소는 구분선 제거 */
  }
`;

export const RankOrder = styled.span`
  font-weight: bold;
  margin-right: 5vw;
`;

export const RankBarWrap = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  animation: ${slideUp} 1s forwards;
  animation-delay: ${({ delay }) => delay}s;
`;

export const RankBar = styled.div`
  width: 18vw;
  background-color: var(--box-yellow-color);
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  box-shadow: 0px -3px 33.4px 0px rgba(0, 0, 0, 0.25);
`;

export const RankName = styled.div`
  position: relative;
  top: 2vh;
  /* text-align: center; */
  display: flex;
  align-items: center;
  /* justify-content: center; */
  font-size: 1.5vw;
  gap: 1rem;
  width: 100%;
  padding-left: 2.5rem;
`;

export const ProfileImg = styled.img`
  width: 10vw;
  height: 10vw;
  border-radius: 50%
`;