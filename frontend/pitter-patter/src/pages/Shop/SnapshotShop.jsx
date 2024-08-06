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
} from './SnapshotShopStyle';

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
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MDY3NjEsImlhdCI6MTcyMjkwNjc2MSwiZXhwIjoxNzIyOTA3NjYxLCJqdGkiOiJmYmY3YWRmNS0yZTIxLTRmMjEtYTZhYy05MDViZjg0ODhmZTgifQ.RFDnaDjT-u6qyYtEBiwOjd44N0aQ7qsNy1cM1WRwDSoqf6lyT2CD6Ic_8kJJTfuX-9c7vXYNzuXP5u3evfrTOw'
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

  return (
    <Wallpaper>
      <GuideText>저장될 사진의 프레임을 골라보세요!</GuideText>
      <ActionRow>
        <ActionButton style={{ marginRight: '15px' }} onClick={cancel}>
          취소
        </ActionButton>
        <ActionButton highlight="true" onClick={save}>
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
      {selectedIdx !== currentIdx ? (
        <ActionButton highlight="true" ref={buttonRef} onClick={handlePurchase}>
          구매
        </ActionButton>
      ) : (
        <ActionButton disabled ref={buttonRef}>
          적용 중
        </ActionButton>
      )}
    </Wallpaper>
  );
}

export default SnapshotShop;
