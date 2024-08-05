import { ToolBar, Wallpaper, GuideText, CarouselWrap, Preview, TransparentButton, ButtonIcon, RowWrap, ActionButton, PreviewFilter, ActionRow } from "./WallpaperShopStyle";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { assetsApi } from '../../apiService';

function WallpaperShop() {
  const Navigator = useNavigate();
  const [wallpapers, setWallpapers] = useState([]);
  const [onWallpaper, setOnWallpaper] = useState(null);
  const childId = 5;

  useEffect(() => {
    getFrames(childId);
  }, []);

  const getFrames = async (childId) => {
    try {
      const response = await assetsApi.get("/item", {
        params: {
          child_id: childId,
        },
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI4NjM0NTAsImlhdCI6MTcyMjg2MzQ1MCwiZXhwIjoxNzIyODY2NDUwLCJqdGkiOiI2YzY2N2I3Ni1mYWI2LTQ4NjQtOWNmZC0wNjVjOGY2ZjMzYTIifQ.swAqzv8jMVyynOXG-eurM8TeHePYTc4fkwffgIQJkblnEykDlTJbEzFVhkIQAIsxJYRinBt1YoDYYXNurFv8Ag'
        }
      });
      setWallpapers(response.data.filter(item => item.itemType === 'BACKGROUND'));
    } catch (error) {
      console.log("Error fetching frames:", error);
    }
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

  // Todo 아이템 has가 false일때 처리
  // 구매 or 장착 만들어야됌
  const save = async () => {
    if (onWallpaper && !onWallpaper.on) { // on이 true가 아닌 경우에만 요청을 보냄
      try {
        await assetsApi.patch(`/item-property/${childId}/on/${onWallpaper.id}`, {}, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI4NjM0NTAsImlhdCI6MTcyMjg2MzQ1MCwiZXhwIjoxNzIyODY2NDUwLCJqdGkiOiI2YzY2N2I3Ni1mYWI2LTQ4NjQtOWNmZC0wNjVjOGY2ZjMzYTIifQ.swAqzv8jMVyynOXG-eurM8TeHePYTc4fkwffgIQJkblnEykDlTJbEzFVhkIQAIsxJYRinBt1YoDYYXNurFv8Ag'
          }
        });
        Navigator(-1);
      } catch (error) {
        console.error("Error saving wallpaper:", error);
      }
    } else {
      Navigator(-1); // on이 true인 경우 그냥 돌아가기
    }
  };

  const handleSelect = (index) => {
    setSelectedWallpaper(index);
    setOnWallpaper(wallpapers[index]);
  };

  return (
    <Wallpaper style={{ backgroundImage: `url(${wallpapers[currentIdx]?.photo})` }}>
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
              <Preview key={index} style={{ backgroundImage: `url(${wallpaper.photo})` }} onClick={() => setCurrentIdx(index)} selected={selectedWallpaper === index}>
                {
                  index === currentIdx &&
                  <PreviewFilter>
                    <ActionButton disabled={selectedWallpaper === index} onClick={() => handleSelect(index)}>
                      {selectedWallpaper === index ? "장착됨" : "장착"}
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
    </Wallpaper>
  );
}

export default WallpaperShop;
