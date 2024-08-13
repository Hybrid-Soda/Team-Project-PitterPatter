// ChildPageStyle.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PointerImg from "/src/assets/cursor/pointer.png";

export const Body = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const ChildBody = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const ChildBackground = styled.div`
  margin-top: 10vh;
  width: 130%;
  height: 100%;
  border-radius: 53px;
  background: var(--logo-blue-color);
  box-shadow: 0px 10px 40px 4px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContextBackground = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 33px;
  background: #FFF;
  box-shadow: 0px 10px 40px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 0;
`;

export const ChildMenu = styled.div`
  width: 12%;
  height: 90%;
`;

export const ChildMenuItem = styled.div`
  width: 30vw;
  height: 13vh;
  border-radius: 21px;
  background: #FFF;
  margin: 0 0 10% 10%;
  z-index: 0;
  font-size: 1.3vw;
  color: var(--font-color);
  display: flex;
  align-items: center;
  padding-left: 8%;
  position: relative;
  cursor: url(${PointerImg}), pointer !important;

  ${({ $isActive }) => $isActive && `
    box-shadow: none;
    z-index: 2;
    color: var(--logo-blue-color);
    font-weight: bold;
    width: 100%;
  `}
`;

export const ContextItem = styled.div`
  padding: 2% 3%;
  position: absolute;
  width: 80vw;
  height: 100%;
  z-index: 5;
`;

export const Backspace = styled(Link)`
  position: relative;
  cursor: url(${PointerImg}), pointer !important;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 10%;
  height: 10%;
  width: fit-content;
`;
