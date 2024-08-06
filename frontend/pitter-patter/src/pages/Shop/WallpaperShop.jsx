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
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MDY3NjEsImlhdCI6MTcyMjkwNjc2MSwiZXhwIjoxNzIyOTA3NjYxLCJqdGkiOiJmYmY3YWRmNS0yZTIxLTRmMjEtYTZhYy05MDViZjg0ODhmZTgifQ.RFDnaDjT-u6qyYtEBiwOjd44N0aQ7qsNy1cM1WRwDSoqf6lyT2CD6Ic_8kJJTfuX-9c7vXYNzuXP5u3evfrTOw'
        }
      });
      setWallpapers(response.data.filter(item => item.itemType === 'BACKGROUND'));
    } catch (error) {
      console.log("Error fetching frames:", error.response.data.msg);
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

  const save = async () => {
    if (onWallpaper && !onWallpaper.on) {
      try {
        await assetsApi.patch(`/item-property/${childId}/on/${onWallpaper.id}`, {}, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MDY3NjEsImlhdCI6MTcyMjkwNjc2MSwiZXhwIjoxNzIyOTA3NjYxLCJqdGkiOiJmYmY3YWRmNS0yZTIxLTRmMjEtYTZhYy05MDViZjg0ODhmZTgifQ.RFDnaDjT-u6qyYtEBiwOjd44N0aQ7qsNy1cM1WRwDSoqf6lyT2CD6Ic_8kJJTfuX-9c7vXYNzuXP5u3evfrTOw'
          }
        });
        Navigator(-1);
      } catch (error) {
        console.error("Error saving wallpaper:", error.response.data.msg);
      }
    } else {
      Navigator(-1);
    }
  };

  const purchaseItem = async (childId, itemId) => {
    try {
      await assetsApi.post(`/item-property/${childId}/${itemId}`, {}, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaXNzIjoiY29tLnBpdHBhdC5waXR0ZXJwYXR0ZXIiLCJuYmYiOjE3MjI5MDY3NjEsImlhdCI6MTcyMjkwNjc2MSwiZXhwIjoxNzIyOTA3NjYxLCJqdGkiOiJmYmY3YWRmNS0yZTIxLTRmMjEtYTZhYy05MDViZjg0ODhmZTgifQ.RFDnaDjT-u6qyYtEBiwOjd44N0aQ7qsNy1cM1WRwDSoqf6lyT2CD6Ic_8kJJTfuX-9c7vXYNzuXP5u3evfrTOw'
        }
      });

      setWallpapers(prevWallpapers =>
        prevWallpapers.map(wallpaper =>
          wallpaper.id === itemId ? { ...wallpaper, has: true } : wallpaper
        )
      );
    } catch (error) {
      console.error("Error purchasing item:", error.response.data.msg);
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
    </Wallpaper>
  );
}

export default WallpaperShop;
