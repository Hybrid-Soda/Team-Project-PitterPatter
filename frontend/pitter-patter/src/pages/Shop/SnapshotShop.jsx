import { 
  Blank, 
  BlankRow, 
  ButtonIcon, 
  Frame, 
  GuideText, 
  ActionButton, 
  CurrentWrap, 
  TransparentButton, 
  Wallpaper, 
  CarouselWrap, 
  ActionRow,
  CoinImg,
  LayoutCoin,
  CoinNumber,
 } from "./SnapshotShopStyle";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Coin from "/src/assets/icons/Coin.png";
import CoinModal from './CoinModal'; // 추가

function SnapshotShop() {
  const Navigator = useNavigate();

  const [frames, setFrames] = useState([
    "/src/assets/img/Shop/frame/frame1.png",
    "/src/assets/img/Shop/frame/frame2.png",
    "/src/assets/img/Shop/frame/frame3.png",
    "/src/assets/img/Shop/frame/frame4.png",
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const buttonRef = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 추가

  const handleLeft = () => {
    buttonRef.current.style.opacity = 0;
    if (currentIdx === 0) {
      setCurrentIdx(frames.length - 1);
    } else {
      setCurrentIdx(currentIdx - 1);
    }
    setTimeout(() => {
      buttonRef.current.style.opacity = 1;
    }, 500);
  };

  const handleRight = () => {
    buttonRef.current.style.opacity = 0;
    if (currentIdx === frames.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
    setTimeout(() => {
      buttonRef.current.style.opacity = 1;
    }, 500);
  };

  const handlePurchase = () => {
    setSelectedIdx(currentIdx);
  };

  const cancel = () => {
    Navigator(-1);
  }

  const save = () => {
    Navigator(-1);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wallpaper>
      <GuideText>
          저장될 사진의 프레임을 골라보세요!
      </GuideText>
      <LayoutCoin onClick={openModal}>
        <CoinImg src={Coin} alt="" />
        <CoinNumber>50 코인</CoinNumber>
      </LayoutCoin>
      <ActionRow>
        <ActionButton style={{ marginRight: "15px" }} onClick={cancel}>취소</ActionButton>
        <ActionButton highlight="true" onClick={save}>저장</ActionButton>
      </ActionRow>
      <CurrentWrap>
        <TransparentButton onClick={handleLeft} style={{left: "100px"}}>
          <ButtonIcon src="/src/assets/icons/ChevronLeft.png" />
        </TransparentButton>
        <CarouselWrap count={frames.length}>
          {frames.map((frame, index) => (
            <Frame key={index} index={currentIdx} style={{ backgroundImage: `url(${frame})` }} target={index === currentIdx}>
              <BlankRow>
                <Blank />
                <Blank />
              </BlankRow>
              <BlankRow>
                <Blank />
                <Blank />
              </BlankRow>
            </Frame>
          ))}
        </CarouselWrap>
        <TransparentButton onClick={handleRight} style={{right: "100px"}}>
          <ButtonIcon src="/src/assets/icons/ChevronRight.png" />
        </TransparentButton>
      </CurrentWrap>
      {
        selectedIdx !== currentIdx ? 
          <ActionButton highlight="true" ref={buttonRef} onClick={handlePurchase}>구매</ActionButton>
        : <ActionButton disabled ref={buttonRef} >적용 중</ActionButton>
      }
      {isModalOpen && <CoinModal onClose={closeModal} />}
    </Wallpaper>
  );
}

export default SnapshotShop;
