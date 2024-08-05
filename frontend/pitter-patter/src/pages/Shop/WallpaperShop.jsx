import { 
  ToolBar,
  Wallpaper, 
  GuideText, 
  CarouselWrap, 
  Preview, 
  TransparentButton, 
  ButtonIcon, 
  RowWrap, 
  ActionButton, 
  PreviewFilter, 
  ActionRow,
  LayoutCoin,
  CoinImg,
  CoinNumber,
 } from "./WallpaperShopStyle";

import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import Coin from "/src/assets/icons/Coin.png";
import CoinModal from './CoinModal'; // 추가

function WallpaperShop() {
  const Navigator = useNavigate();

  const [wallpapers, setWallpapers] = useState([
    "/src/assets/img/Shop/wallpaper/background1.png",
    "/src/assets/img/Shop/wallpaper/background2.png",
    "/src/assets/img/Shop/wallpaper/background3.png",
    "/src/assets/img/Shop/wallpaper/background4.png",
    "/src/assets/img/Shop/wallpaper/background5.png",
    "/src/assets/img/Shop/wallpaper/background1.png",
    "/src/assets/img/Shop/wallpaper/background2.png",
    "/src/assets/img/Shop/wallpaper/background3.png",
    "/src/assets/img/Shop/wallpaper/background4.png",
    "/src/assets/img/Shop/wallpaper/background5.png",
    "/src/assets/img/Shop/wallpaper/background1.png",
    "/src/assets/img/Shop/wallpaper/background2.png",
    "/src/assets/img/Shop/wallpaper/background3.png",
    "/src/assets/img/Shop/wallpaper/background4.png",
    "/src/assets/img/Shop/wallpaper/background5.png",
  ]);

  const carouselRef = useRef(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWallpaper, setSelectedWallpaper] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 추가

  const handleLeft = () => {
    carouselRef.current.scroll({
      left: carouselRef.current.scrollLeft - window.innerHeight * 0.23,
      behavior: "smooth"
    })
  };

  const handleRight = () => {
    carouselRef.current.scroll({
      left: carouselRef.current.scrollLeft + window.innerHeight * 0.23,
      behavior: "smooth"
    })
  };

  const cancel = () => {
    Navigator(-1);
  };

  const save = () => {
    Navigator(-1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wallpaper style={{ backgroundImage: `url(${wallpapers[currentIdx]})` }}>
      <LayoutCoin onClick={openModal}>
        <CoinImg src={Coin} alt="" />
        <CoinNumber>50 코인</CoinNumber>
      </LayoutCoin>
      <ActionRow>
        <ActionButton style={{marginRight: "15px"}} onClick={cancel}>
          취소
        </ActionButton>
        <ActionButton highlight onClick={save}>
          저장
        </ActionButton>
      </ActionRow>
      <ToolBar>
        <GuideText>게임 내에서 사용할 배경을 골라보세요!</GuideText>
        <RowWrap>
          <TransparentButton style={{left: "0"}} onClick={handleLeft}>
            <ButtonIcon src="/src/assets/icons/ChevronLeft.png" />
          </TransparentButton>
          <CarouselWrap ref={carouselRef}>
            {wallpapers.map((wallpaper, index) => (
              <Preview key={index} style={{ backgroundImage: `url(${wallpaper})` }} onClick={() => setCurrentIdx(index)} selected={selectedWallpaper === index}>
                {
                  index === currentIdx &&
                  <PreviewFilter>
                    {/* <ActionButton highlight>구매</ActionButton> */}
                      <ActionButton disabled={selectedWallpaper === index} onClick={() => setSelectedWallpaper(index)}>
                        {selectedWallpaper === index ? "장착됨" : "장착"}
                      </ActionButton>
                  </PreviewFilter>
                }
              </Preview>
            ))}
          </CarouselWrap>
          <TransparentButton style={{right: "0"}} onClick={handleRight}>
            <ButtonIcon src="/src/assets/icons/ChevronRight.png" />
          </TransparentButton>
        </RowWrap>
      </ToolBar>
      {isModalOpen && <CoinModal onClose={closeModal} />}
    </Wallpaper>
  );
}

export default WallpaperShop;