import styled, { keyframes } from "styled-components";
import YellowWaveBackground from "/src/assets/img/Background/YellowWave.png";
import PointerImg from "/src/assets/cursor/pointer.png"

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 80%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const MainWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${YellowWaveBackground});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CenterRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.span`
  font-family: "TTLaundryGothicB";
  font-size: 30px;
  color: #f9810a;
  margin-bottom: 3rem;
`;

export const Frame = styled.div`
  height: fit-content;
  margin: 0 50px;
  height: 400px;
  width: 328px;
  border-radius: 10px;
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

  // if props.active is true, set hover and active styles
  ${(props) =>
    props.active &&
    `
    &:hover {
      background-color: lightgray;
    }
    &:active {
      background-color: gray;
    }
    transition: 0.3s;
  `}
`;

export const UserImg = styled.img`
  height: 100%;
  width: 100%;
  // cut overflowed image
  object-fit: cover;
`;

export const AddImg = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
`;

export const Toolbar = styled.div`
  margin: 0 50px;
  height: 400px;
  width: 328px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.button`
  width: 60%;
  padding: 10px;
  border-radius: 30px;
  background-color: var(--box-yellow-color);
  box-shadow: 0 6px 0 0 #ffc139;
  font-family: "NEXON Lv1 Gothic OTF";
  font-weight: bold;
  font-size: 15px;
  color: var(--font-color);

  &:hover {
    box-shadow: 0 4px 0 0 #ffc139;
    transform: translateY(3px);
  }

  &:active {
    box-shadow: 0 0 0 0 #ffc139;
    transform: translateY(6px);
  }

  transition: 0.3s;
`;

export const ToolWrap = styled.div`
  height: 50%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 30px;
`;

export const ToolTitle = styled.span`
  font-family: "NEXON Lv1 Gothic OTF";
  font-size: 17px;
  color: #616161;
  font-weight: bold;
`;

export const ToolRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const Tool = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: url(${PointerImg}), pointer !important;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
  transition: 0.3s;
`;

export const ToolImg = styled.img`
  height: 120px;
`;

export const GoResultButton = styled.button`
  width:fit-content;
  padding:1.5vh 2vw;
  border-radius: 30px;
  background-color: var(--box-yellow-color);
  box-shadow: 0 6px 0 0 #ffc139;
  font-family: "NEXON Lv1 Gothic OTF";
  font-weight: bold;
  font-size: 15px;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;

  animation: ${slideUp} 1s forwards;

  &:hover {
    box-shadow: 0 4px 0 0 #ffc139;
    transform: translate(-50%, 3px);
  }

  &:active {
    box-shadow: 0 0 0 0 #ffc139;
    transform: translate(-50%, 6px);
  }

  transition: 0.3s;
`;

export const Modal = styled.div`
  position: absolute;
  z-index: 10;
  overflow: hidden;
  width:40vw;
  height:36vw;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

export const ModalContent = styled.div`
    height: 100%;
    width: 100%;
`

export const ViewFinder = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Countdown = styled.div`
  position: absolute;
  bottom: 3vh;
  left: 50%;
  transform: translateX(-50%);
  font-family: "NEXON Lv1 Gothic OTF";
  font-size: 50px;
  font-weight: bold;
  color: #f9810a;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 50%;
  z-index: 10;
`