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
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { assetsApi } from '../../apiService';

import Coin from "/src/assets/icons/Coin.png";
import CoinModal from './CoinModal'; // 추가

function WallpaperShop() {
  const Navigator = useNavigate();
  const [wallpapers, setWallpapers] = useState([]);
  const [onWallpaper, setOnWallpaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 추가
  const [points, setPoints] = useState(0); // 추가
  const [pointRecords, setPointRecords] = useState([]); // 추가
  const [page, setPage] = useState(1); // 페이지 번호 추가
  const itemsPerPage = 20; // 페이지당 아이템 수
  const jwtToken = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNyIsImlzcyI6ImNvbS5waXRwYXQucGl0dGVycGF0dGVyIiwibmJmIjoxNzIyOTkzNjU3LCJpYXQiOjE3MjI5OTM2NTcsImV4cCI6MTcyMzU5ODQ1NywianRpIjoiYTI3ODNkYWYtMGQ3ZC00Zjg5LWEwNzQtZDExMzkxMGQ2MjE4In0.UwVTKI1xMvVxSmn3NWqLKG5XzNDXdd5dOkvQY-_aPVwPr3MsHCh00yHJiXEXLMghXDRtQqFNm2eveoCOdv7gdA'

  // const childId = useSelector((state) => state.child.id);
  const childId = 24;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getFrames(childId);
    getPoints(childId);
    getPointRecords(childId, 1); // 첫 페이지 로드
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
      setWallpapers(response.data.filter(item => item.itemType === 'BACKGROUND'));
    } catch (error) {
      console.log("Error fetching frames:", error.response.data.msg);
      alert(error.response.data.msg);
    }
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
      alert(error.response.data.msg);
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
      alert(error.response.data.msg);
    }
  };

  const loadMoreRecords = () => {
    getPointRecords(childId, page + 1);
  };

  const carouselRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);

  const handleLeft = () => {
    carouselRef.current.scroll({
      left: carouselRef.current.scrollLeft - window.innerHeight * 0.23,
      behavior: "smooth"
    });
  };

  const handleRight = () => {
    carouselRef.current.scroll({
      left: carouselRef.current.scrollLeft + window.innerHeight * 0.23,
      behavior: "smooth"
    });
  };

  const cancel = () => {
    Navigator(-1);
  };

  const save = async () => {
    if (onWallpaper && !onWallpaper.on) { // on이 true가 아닌 경우에만 요청을 보냄
      try {
        await assetsApi.patch(`/item-property/${childId}/on/${onWallpaper.id}`, {}, {
          headers: {
            Authorization: `${jwtToken}`
          }
        });
        Navigator(-1);
      } catch (error) {
        console.error("Error saving wallpaper:", error.response.data.msg);
        alert(error.response.data.msg);
      }
    } else {
      Navigator(-1); // on이 true인 경우 그냥 돌아가기
    }
  };

  const purchaseItem = async (childId, itemId) => {
    try {
      await assetsApi.post(`/item-property/${childId}/${itemId}`, {}, {
        headers: {
          Authorization: `${jwtToken}`
        }
      });

      setWallpapers(prevWallpapers =>
        prevWallpapers.map(wallpaper =>
          wallpaper.id === itemId ? { ...wallpaper, has: true } : wallpaper
        )
      );
    } catch (error) {
      console.error("Error purchasing item:", error.response.data.msg);
      alert(error.response.data.msg);
    }
  };

  const toggleWallpaper = (index) => {
    setWallpapers(prevWallpapers =>
      prevWallpapers.map((wallpaper, i) =>
        i === index ? { ...wallpaper, on: !wallpaper.on } : { ...wallpaper, on: false }
      )
    );
  };

  const handleSelect = (index) => {
    setSelectedWallpaper(index);
    setOnWallpaper(wallpapers[index]);
    toggleWallpaper(index);
  };

  return (
    <Wallpaper style={{ backgroundImage: `url(${wallpapers[currentIdx]?.photo})` }}>
      <LayoutCoin onClick={openModal}>
        <CoinImg src={Coin} alt="" />
        <CoinNumber>{points} 코인</CoinNumber>
      </LayoutCoin>

      <ActionRow>
        <ActionButton style={{ marginRight: "15px" }} onClick={cancel}>
          취소
        </ActionButton>
        <ActionButton highlight onClick={save}>
          저장
        </ActionButton>
      </ActionRow>
      <ToolBar>
        <GuideText>게임 내에서 사용할 배경을 골라보세요!</GuideText>
        <RowWrap>
          <TransparentButton style={{ left: "0" }} onClick={handleLeft}>
            <ButtonIcon src="/src/assets/icons/ChevronLeft.png" />
          </TransparentButton>
          <CarouselWrap ref={carouselRef}>
            {wallpapers.map((wallpaper, index) => (
              <Preview key={index} style={{ backgroundImage: `url(${wallpaper.photo})` }} 
              onClick={() => setCurrentIdx(index)} selected={selectedWallpaper === index}>
                {
                  index === currentIdx &&
                  <PreviewFilter>
                    <ActionButton
                      disabled={selectedWallpaper === index && wallpaper.has && wallpaper.on}
                      onClick={() => {
                        if (!wallpaper.has) {
                          purchaseItem(childId, wallpaper.id);
                        } else {
                          handleSelect(index);
                        }
                      }}
                    >
                      {wallpaper.has ? (wallpaper.on ? "장착됨" : "장착") : "구매"}
                    </ActionButton>
                  </PreviewFilter>
                }
              </Preview>
            ))}
          </CarouselWrap>
          <TransparentButton style={{ right: "0" }} onClick={handleRight}>
            <ButtonIcon src="/src/assets/icons/ChevronRight.png" />
          </TransparentButton>
        </RowWrap>
      </ToolBar>
      {isModalOpen && <CoinModal onClose={closeModal} points={points} pointRecords={pointRecords} loadMoreRecords={loadMoreRecords} />} {/* 모달에 pointRecords 전달 */}
    </Wallpaper>
  );
}

export default WallpaperShop;
