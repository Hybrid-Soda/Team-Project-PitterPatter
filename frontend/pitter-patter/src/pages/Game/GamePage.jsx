import React, { useState, useEffect } from "react";
import { MainWrap } from "./GamePageStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import WebcamTestPage from "../Game/WebcamTestPage";
import UnityComponent from "./Unity"; // 수정된 컴포넌트 임포트
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
  const [score, setScore] = useState(0); // score 상태
  
  // set backgroundNum from redux store
  const backgroundNum = parseInt(useSelector((state) => state.item.backgroundItem));

  const handleTestComplete = () => {
    setTestCompleted(true);
    setIsLoading(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const token = useSelector((state) => state.token.accessToken);
  const childId = useSelector((state) => state.child.id);

  const openAttModal = async () => {
    try {
      const firstResponse = await gameApi.post(`/${childId}`, {
        score: score, // UnityComponent에서 업데이트된 score 값을 사용
        playtime: 60,
        burnedCalorie: 4,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('첫 번째 요청 성공:', firstResponse.data);

      if (firstResponse.data === true) {
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
    setModalOpen(true);
    getWallpaper(childId);
  }, [childId]);

  useEffect(() => {
    console.log("점수 변화:", score);
  }, [score]);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? (
        <div>
          {isLoading && <Loader />}
          <UnityComponent onGameEnd={openAttModal} isLoading={isLoading} setIsLoading={setIsLoading} score={score} setScore={setScore} backgroundNum={backgroundNum} />
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
