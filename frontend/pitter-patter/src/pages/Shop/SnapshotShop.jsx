import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetsApi } from '../../apiService';

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

import Coin from "/src/assets/icons/Coin.png";
import CoinModal from './CoinModal'; // 추가

function SnapshotShop() {
  const Navigator = useNavigate();

  const [frames, setFrames] = useState([]);

  useEffect(() => {
    const childId = 5; 
    getFrames(childId);
  }, []);

  const getFrames = async (childId) => {
    try {
      const response = await assetsApi.get("/item", {
        params: {
          child_id: childId,
        },
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MDY3NjEsImlhdCI6MTcyMjkwNjc2MSwiZXhwIjoxNzIzNTExNTYxLCJqdGkiOiIwZDdhMTI3Mi0xMzQzLTRmYTctODJmOS1jMmYwMzUwYzlkMjgifQ.1N0esU9NWJwUTSc3sJB3tZPQr1mVEyk2FBz8mmCa8YWDBls-19c_DtIS83eCXrD0rSFiiPSrMQtFk8Y5U2YoRA'
        }
      });
      // console.log(response.data);
      const photoUrls = response.data
        .filter(item => item.itemType === 'FRAME')
        .map(item => item.photo);
      setFrames(photoUrls);
    } catch (error) {
      console.log("Error fetching frames:", error);
    }
  };

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
    <Wallpaper>
      <GuideText>
          저장될 사진의 프레임을 골라보세요!
      </GuideText>
      <LayoutCoin onClick={openModal}>
        <CoinImg src={Coin} alt="" />
        <CoinNumber>50 코인</CoinNumber>
      </LayoutCoin>
      <ActionRow>
        <ActionButton style={{ marginRight: '15px' }} onClick={cancel}>
          취소
        </ActionButton>
        <ActionButton highlight onClick={save}>
          저장
        </ActionButton>
      </ActionRow>
      <CurrentWrap>
        <TransparentButton onClick={handleLeft} style={{ left: '100px' }}>
          <ButtonIcon src="/src/assets/icons/ChevronLeft.png" />
        </TransparentButton>
        <CarouselWrap count={frames.length}>
          {frames.map((frame, index) => (
            <Frame
              key={index}
              index={currentIdx}
              style={{ backgroundImage: `url(${frame})` }}
              istarget={(index === currentIdx) ? true : undefined}
            >
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
        <TransparentButton onClick={handleRight} style={{ right: '100px' }}>
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
