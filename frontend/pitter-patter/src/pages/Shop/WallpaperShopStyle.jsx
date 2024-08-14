import styled from "styled-components";
import PointerImg from "/src/assets/cursor/pointer.png";

export const Wallpaper = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s;
`;

export const ToolBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100vw;
  background-color: rgba(255,255,255, 0.3);
  backdrop-filter: blur(10px);
  position: fixed;
  bottom: 0;
  padding: 5vh 0;
`;

export const GuideText = styled.div`
  font-size: 4vh;
  font-weight: 700;
  color: white;
  font-family: "TTLaundryGothicB";
  user-select: none;
`;

export const RowWrap = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;  
  justify-content: space-evenly;
  align-items: center;
`;

export const CarouselWrap = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  overflow: hidden;
`;

export const Preview = styled.div`
  height: 15vh;
  width: 15vh;
  flex-shrink: 0;
  background-color: white;
  border-radius: 20px;
  margin: 4vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: url(${PointerImg}), pointer !important;
  box-sizing: border-box;
  border: ${(props) => (props.selected ? "1vh solid var(--box-green-color)" : "none")};
`;

export const PreviewFilter = styled.div`
  width: 100%;
  height: 100%; 
  backdrop-filter: brightness(0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled.button`
  border: none;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
  font-weight: 700;
  padding: 1vh 2vh;
  border-radius: 20px;
  user-select: none;
  z-index: 1;
  background-color: ${(props) => (props.highlight ? "var(--box-green-color)" : "#D9D9D9")};
  box-shadow: ${(props) => (props.highlight ? "0 5px 0 0 #629D1B" : "0 5px 0 0 #757575")};

  transition: ease-in-out 0.1s;

  &:hover:not(:disabled) {
    box-shadow: ${(props) => (props.highlight ? "0 4px 0 0 #629D1B" : "0 4px 0 0 #757575")};
    transform: translateY(1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${(props) => (props.highlight ? "0 1px 0 0 #629D1B" : "0 1px 0 0 #757575")};
    transform: translateY(2px);
  }

  &:disabled {
    color: black;
    background-color: #B3B3B3;
    box-shadow: 0 -3px 1px 0 #757575;
    cursor: auto;
  }
`;

export const TransparentButton = styled.button`
  background-color: transparent;
  border: none;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  width: 60px;
  z-index: 1;
  position: relative;
  user-select: none;
  border-radius: 50%;
  padding: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: rgba(255,255,255, 0.3);
  }

  &:active {
    background-color: rgba(255,255,255, 0.5);
  }

  transition: ease-in-out 0.2s;
`;

export const ButtonIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5vh;
  right: 0;
  padding: 2vh 4vh;
  backdrop-filter: blur(10px);
  background-color: rgba(255,255,255, 0.3);
`;

export const LayoutCoin = styled.div`
  position: absolute;
  top: 5vh;
  left: 0;
  width: 10vw;
  height: 7vh;
  background-color: #0000003a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  /* border-radius: 10rem; */
  cursor: url(${PointerImg}), pointer !important;
`

export const CoinImg = styled.img`
  width: 30px;
`;

export const CoinNumber = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;