import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetsApi } from '../../apiService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setItem } from '../../redux/itemSlice';

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

import ConfirmModal from '../Components/modal';
import Loader from '../Components/loader';

import LeftButton from "/src/assets/icons/ChevronLeft.png";
import RightButton from "/src/assets/icons/ChevronRight.png";

import BackgroundImg from "/src/assets/img/Background/YellowWave.png";

function SnapshotShop() {
  const Navigator = useNavigate();

  const [frames, setFrames] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointRecords, setPointRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [onFrame, setOnFrame] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const itemsPerPage = 20;

  const childId = useSelector((state) => state.child.id);

  const [currentIdx, setCurrentIdx] = useState(0);
  const buttonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [itemPrice, setItemPrice] = useState(null); // 아이템 가격을 저장할 상태 추가

  const token = useSelector((state) => state.token.accessToken);
  const jwtToken = `Bearer ${token}`;


  useEffect(() => {
    getFrames(childId);
    getPoints(childId);
    getPointRecords(childId);
  }, [childId]);

  const getFrames = async (childId) => {
    try {
      const response = await assetsApi.get("/item", {
        params: {
          child_id: childId,
        },
        headers: {
          Authorization: `${jwtToken}`,
        },
      });

      const frames = response.data.filter(item => item.itemType === 'FRAME');
      setFrames(frames);
      setIsLoading(false); // 프레임 로드 완료 후 로딩 상태 false로 설정
    } catch (error) {
      console.log("Error fetching frames:", error.response.data.msg);
      setErrorMessage(error.response.data.msg);
      setIsConfirmModalOpen(true);
      setIsLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
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
          Authorization: `${jwtToken}`,
        },
      });

      setFrames(prevFrames =>
        prevFrames.map(Frame =>
          Frame.id === itemId ? { ...Frame, has: true } : Frame
        )
      );
    } catch (error) {
      console.error("Error purchasing item:", error.response.data.msg);
      
      // 에러 메시지가 "포인트가 부족합니다."인 경우, 현재 선택된 프레임의 가격을 itemPrice에 저장
      if (error.response.data.msg === "포인트가 부족합니다.") {
        const selectedItem = frames.find(frame => frame.id === itemId);
        if (selectedItem) {
          setItemPrice(selectedItem.price); // 선택된 프레임의 가격을 itemPrice 상태에 저장
        }
      }
      setErrorMessage(error.response.data.msg);
      setIsConfirmModalOpen(true);
    }
  };

  const cancel = () => {
    Navigator(-1);
  };

  const dispatch = useDispatch();
  const save = async () => {
    if (onFrame && !onFrame.on) {
      try {
        await assetsApi.patch(`/item-property/${childId}/on/${onFrame.id}`, {}, {
          headers: {
            Authorization: `${jwtToken}`,
          },
        });
        // console.log(onFrame.id);
        dispatch(setItem({ frameItem: onFrame.id }));
        Navigator(-1);
      } catch (error) {
        console.error("Error saving wallpaper:", error.response.data.msg);
        setErrorMessage(error.response.data.msg);
        setIsConfirmModalOpen(true);
      }
    } else {
      Navigator(-1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const getPoints = async (childId) => {
    try {
      const response = await assetsApi.get(`/point/${childId}`, {
        headers: {
          Authorization: `${jwtToken}`,
        },
      });
      setPoints(response.data.point);
    } catch (error) {
      console.log("Error fetching points:", error.response.data.msg);
      // alert(error.response.data.msg);
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
          Authorization: `${jwtToken}`,
        },
      });
      setPointRecords(prevRecords => [...prevRecords, ...response.data]);
      setPage(page);
      console.log('로그')
    } catch (error) {
      console.log("Error fetching point records:", error.response.data.msg);
      // alert(error.response.data.msg);
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

  // 로딩 중이라면 Loader 컴포넌트를 표시
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wallpaper style={{backgroundImage: `url(${BackgroundImg})`}}>
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
          <ButtonIcon src={LeftButton} />
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
          <ButtonIcon src={RightButton} />
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
      {isModalOpen && <CoinModal onClose={closeModal} points={points} pointRecords={pointRecords} loadMoreRecords={loadMoreRecords} />}
      {isConfirmModalOpen && (
        <ConfirmModal
          title={itemPrice ? `${errorMessage} (아이템 가격: ${itemPrice} 코인)` : errorMessage}
          onClose={handleConfirmModalClose}
        />
      )}
    </Wallpaper>
  );
}

export default SnapshotShop;
  