import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetsApi } from '../../apiService';
import { useSelector } from 'react-redux';

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
import CoinModal from './CoinModal';

function SnapshotShop() {
  const Navigator = useNavigate();

  const [frames, setFrames] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointRecords, setPointRecords] = useState([]); // 추가
  const [page, setPage] = useState(1); // 페이지 번호 추가
  const [onFrame, setOnFrame] = useState(null)
  const [selectedFrame, setSelectedFrame] = useState(0);
  const itemsPerPage = 20; // 페이지당 아이템 수

  // const childId = useSelector((state) => state.child.id);
  const childId = 24;

  const [currentIdx, setCurrentIdx] = useState(0);
  const buttonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 추가
  const jwtToken = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNyIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIyOTkzNjU3LCJpYXQiOjE3MjI5OTM2NTcsImV4cCI6MTcyMzU5ODQ1NywianRpIjoiYTI3ODNkYWYtMGQ3ZC00Zjg5LWEwNzQtZDExMzkxMGQ2MjE4In0.UwVTKI1xMvVxSmn3NWqLKG5XzNDXdd5dOkvQY-_aPVwPr3MsHCh00yHJiXEXLMghXDRtQqFNm2eveoCOdv7gdA'

  useEffect(() => {
    getFrames(childId);
    getPoints(childId);
  }, []);

  const getFrames = async (childId) => {
    try {
      const response = await assetsApi.get("/item", {
        params: {
          child_id: childId,
        },
        headers: {
          Authorization: `${jwtToken}`
        }
      });

      const frames = response.data
        .filter(item => item.itemType === 'FRAME')
      setFrames(frames);
    } catch (error) {
      console.log("Error fetching frames:", error.response.data.msg);
      alert(error.response.data.msg); // 에러 메시지 알림
    }
  };

  const loadMoreRecords = () => {
    getPointRecords(childId, page + 1);
  };

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

  const purchaseItem = async (childId, itemId) => {
    try {
      await assetsApi.post(`/item-property/${childId}/${itemId}`, {}, {
        headers: {
          Authorization: `${jwtToken}`
        }
      });

      setFrames(prevFrames =>
        prevFrames.map(Frame =>
          Frame.id === itemId ? { ...Frame, has: true } : Frame
        )
      );
    } catch (error) {
      console.error("Error purchasing item:", error.response.data.msg);
      alert(error.response.data.msg); // 에러 메시지 알림
    }
  };

  const cancel = () => {
    Navigator(-1);
  };

  const save = async () => {
    if (onFrame && !onFrame.on) { // on이 true가 아닌 경우에만 요청을 보냄
      try {
        await assetsApi.patch(`/item-property/${childId}/on/${onFrame.id}`, {}, {
          headers: {
            Authorization: `${jwtToken}`
          }
        });
        Navigator(-1);
      } catch (error) {
        console.error("Error saving wallpaper:", error.response.data.msg);
        alert(error.response.data.msg); // 에러 메시지 알림
      }
    } else {
      Navigator(-1); // on이 true인 경우 그냥 돌아가기
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPoints = async (childId) => {
    try {
      const response = await assetsApi.get(`/point/${childId}`, {
        headers: {
          Authorization: `${jwtToken}`
        }
      });
      setPoints(response.data.point);
    } catch (error) {
      console.log("Error fetching points:", error.response.data.msg);
      alert(error.response.data.msg); // 에러 메시지 알림
    }
  };

  const getPointRecords = async (childId, page) => {
    try {
      const response = await assetsApi.get(`/point-record/${childId}`, {
        params: {
          page: page,
          per_page: itemsPerPage,
        },
        headers: {
          Authorization: `${jwtToken}`
        }
      });
      setPointRecords(prevRecords => [...prevRecords, ...response.data]);
      setPage(page);
    } catch (error) {
      console.log("Error fetching point records:", error.response.data.msg);
      alert(error.response.data.msg); // 에러 메시지 알림
    }
  };

  const toggleFrame = (index) => {
    setFrames(prevFrames =>
      prevFrames.map((frame, i) =>
        i === index ? { ...frame, on: !frame.on } : { ...frame, on: false }
      )
    );
  };

  const handleSelect = (index) => {
    setSelectedFrame(index);
    setOnFrame(frames[index]);
    toggleFrame(index);
  };

  return (
    <Wallpaper>
      <GuideText>
          저장될 사진의 프레임을 골라보세요!
      </GuideText>
      <LayoutCoin onClick={openModal}>
        <CoinImg src={Coin} alt="" />
        <CoinNumber>{points} 코인</CoinNumber>
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
              style={{ backgroundImage: `url(${frame.photo})` }}
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
      <ActionButton highlight="true" ref={buttonRef}
        style={{ display: 'block', margin: '0 auto', marginTop: '10px' }}
        disabled={frames[currentIdx]?.has && frames[currentIdx]?.on}
        onClick={() => {
          if (!frames[currentIdx]?.has) {
            purchaseItem(childId, frames[currentIdx]?.id);
          } else {
            handleSelect(currentIdx);
          }
        }}
      >
        {frames[currentIdx]?.has ? (frames[currentIdx]?.on ? "장착됨" : "장착") : "구매"}
      </ActionButton>
      {isModalOpen && <CoinModal onClose={closeModal} points={points} pointRecords={pointRecords} loadMoreRecords={loadMoreRecords} />} {/* 모달에 pointRecords 전달 */}
    </Wallpaper>
  );
}

export default SnapshotShop;
