import styled from 'styled-components';
import PointerImg from "/src/assets/cursor/pointer.png";

export const LayoutBase = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--box-pink-color);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-corner {
    display: none;
  }
  ::-webkit-resizer {
    display: none;
  }
`;

export const LayoutMyPage = styled.div`
  background-color: var(--box-pink-color);
  height: 80vh;
  width: 70vw;
  border-radius: 40px;
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 1vw;
`;

export const MenuWrap = styled.div`
  width: 30%;
`;

export const MenuIcon = styled.img`
  width: 3vw;
  height: 3vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
`;

export const MenuItemWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MenuItem = styled.div`
  font-size: 1.5vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
  font-weight: 700;
  /* color: #616161; */
  color: ${(props) => props.color !== 'white'? props.color:"white"};
  cursor: url(${PointerImg}), pointer !important;

  &:hover {
    color: white;
  }
`;

export const MainWrap = styled.div`
  background-color: white;
  border-radius: 30px;
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;