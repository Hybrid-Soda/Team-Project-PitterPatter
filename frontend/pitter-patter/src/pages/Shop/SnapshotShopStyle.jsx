import styled from "styled-components";
import PointerImg from "/src/assets/cursor/pointer.png";

export const Wallpaper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: Column;
  justify-content: center;
  align-items: center;
  /* background-image: url("/src/assets/img/Background/YellowWave.png"); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const GuideText = styled.span`
  font-size: 3vh;
  font-weight: 700;
  color: #000;
  font-family: "TTLaundryGothicB";
  user-select: none;
`;

export const CurrentWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  margin: 30px 0;
  width: 100vw;
`;

export const Frame = styled.div`
  height: fit-content;
  margin: 0 50px;
  height: 400px;
  width: 328px;
  border-radius: 10px;
  opacity: ${(props) => (props.istarget ? "1" : "0.5")};
  transform: translateX(${(props) => -(props.index * 428)}px);
  transition: transform 0.5s;
`;

export const BlankRow = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
`;

export const Blank = styled.div`
  height: 126px;
  width: 140px;
  margin-left: 16px;
  margin-top: 16px;
  position: relative;
  background-color: white;
  background-image: url(/src/assets/frame/example.png);
  background-size: cover;
  background-position: center;
`;

export const TransparentButton = styled.button`
  background-color: transparent;
  border: none;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  width: 50px;
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;

export const ButtonIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const ActionButton = styled.button`
  border: none;
  /* cursor: url(/src/assets/cursor/pointer.png), pointer !important; */
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 30px;
  user-select: none;
  background-color: ${(props) => (props.highlight ? "var(--box-green-color)" : "#D9D9D9")};
  box-shadow: ${(props) => (props.highlight ? "0 5px 0 0 #629D1B" : "0 5px 0 0 #757575")};
  transition: ease-in-out 0.1s;

  &:hover:not(:disabled) {
    box-shadow: ${(props) => (props.highlight ? "0 4px 0 0 #629D1B" : "0 4px 0 0 #757575")};
    transform: translateY(1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${(props) => (props.highlight ? "0 0 0 0 #629D1B" : "0 0 0 0 #757575")};
    transform: translateY(2px);
  }

  &:disabled {
    color: black;
    background-color: #B3B3B3;
    box-shadow: 0 -3px 1px 0 #757575;
    cursor: auto;
  }
`;

export const CarouselWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  left: ${(props) => Math.min(props.count*428, window.innerWidth)/2 - 214}px;
`;

export const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  right: 100px;
`;

export const LayoutCoin = styled.div`
  position: absolute;
  top: 80px;
  left: 100px;
  width: 10vw;
  height: 6vh;
  background-color: #0000003a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  border-radius: 10rem;
  cursor: url(${PointerImg}), pointer !important;
`

export const CoinImg = styled.img`
  width: 30px;
`;

export const CoinNumber = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;