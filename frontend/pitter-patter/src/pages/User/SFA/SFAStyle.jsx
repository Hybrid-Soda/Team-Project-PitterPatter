import styled from 'styled-components';
import PointerImg from "/src/assets/cursor/pointer.png";

export const LayoutBase = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LayoutSFA = styled.div`
  background-color: var(--box-pink-color);
  height: 80vh;
  width: 40vw;
  border-radius: 40px;
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const DotWrap = styled.div`
  width: 14vw;
  height: 1vw;
  margin-top: 1vh;
  display: flex;
  justify-content: space-evenly;
`;

export const PasswordDot = styled.div`
  width: 1vw;
  height: 1vw;
  background-color: #757575;
  border-radius: 50%;
  margin-left: 0.5vw;

  &.filled {
    background-color: #ffffff;
  }
`;

export const NumpadWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin-top: 1vh;
  background-color: #ffffff;
  border-radius: 40px;
  color: #757575;
  font-weight: bold;
  padding: 2vh 2vw;
`;

export const NumpadRow = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &:not(:nth-child(4)) {
    border-bottom: 2px solid #d9d9d9;
  }
`;

export const Numpad = styled.div`
  width: 33%;
  font-size: 1.5vw;
  font-family: 'LOTTERIACHAB';
  font-weight: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: url(${PointerImg}), pointer !important;

  &:not(:nth-child(3n)) {
    border-right: 2px solid #d9d9d9;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #e0e0e0;
  }

  transition: background-color 0.1s ease-in-out;
`;

export const IconBackspace = styled.img`
  width: 2vw;
  height: 2vw;
  padding: 0;
`;

export const ForgotPassword = styled.div`
  margin-bottom: 1.5vh;
  color: #616161;
  text-decoration: underline;
  cursor: url(${PointerImg}), pointer !important;
  user-select: none;
`;

export const IconX = styled.img`
  width: 2vw;
  height: 2vw;
  margin-left: 1vw;
`;
