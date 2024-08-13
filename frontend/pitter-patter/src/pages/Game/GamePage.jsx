import React, { useState, useEffect } from "react";
import { MainWrap } from "./GamePageStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import WebcamTestPage from "../Game/WebcamTestPage";
import Unity from "./Unity";
import { getWallpaper } from "./gameApi.js";
import AttModal from "./AttModal";
import { useSelector } from "react-redux";
import { assetsApi, gameApi } from "../../apiService.js";
import Loader from "../Components/loader.jsx";

function GamePage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [attModalOpen, setAttModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestComplete = () => {
    setTestCompleted(true);
    setIsLoading(true); // 로딩 시작
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const token = useSelector((state) => state.token.accessToken);
  const childId = useSelector((state) => state.child.id);

  const openAttModal = async () => {
    try {
      const firstResponse = await gameApi.post(`/${childId}`, {
        score: 0,
        playtime: 0,
        burnedCalorie: 0,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('첫 번째 요청 성공:', firstResponse.data);

      if (firstResponse.data.result === true) {
        const secondResponse = await assetsApi.patch('/point', {
          amount: 12,
          source: '게임 플레이 보상',
          childId: childId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('두 번째 포인트 지급 성공:', secondResponse.data);      
        setAttModalOpen(true);
      } else {
        const secondResponse = await assetsApi.patch('/point', {
          amount: 2,
          source: '게임 플레이 보상',
          childId: childId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('두 번째 포인트 지급 성공:', secondResponse.data);
      }

    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  const closeAttModal = () => {
    setAttModalOpen(false);
  };

  useEffect(() => {
    setModalOpen(true); // 페이지 접근 시 모달 창 열기
    getWallpaper(childId); // childId를 넣으면 그 아이가 착용하고 있는 벽의 이미지 주소가 return됨
  }, [childId]);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? (
        <div>
          {isLoading && <Loader />}
          <Unity onGameEnd={openAttModal} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      ) : (
        <WebcamTestPage onTestComplete={handleTestComplete} />
      )}
      {modalOpen && <IsReady onClose={closeModal} />}
      {attModalOpen && <AttModal onClose={closeAttModal} />}
    </MainWrap>
  );
}

export default GamePage;
