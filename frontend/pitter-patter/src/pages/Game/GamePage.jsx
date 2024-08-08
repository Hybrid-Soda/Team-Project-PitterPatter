import React, { useState, useEffect } from "react";
import { MainWrap } from "./GamePageStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import WebcamTestPage from "../Game/WebcamTestPage";
import Unity from "./Unity";
import { getWallpaper } from "./gameApi.js";
import AttModal from "./AttModal";

function GamePage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [attModalOpen, setAttModalOpen] = useState(false);

  const handleTestComplete = () => {
    setTestCompleted(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openAttModal = () => {
    setAttModalOpen(true);
  };

  const closeAttModal = () => {
    setAttModalOpen(false);
  };

  const childId = 5;

  useEffect(() => {
    setModalOpen(true); // 페이지 접근 시 모달 창 열기
    getWallpaper(childId); // childId를 넣으면 그 아이가 착용하고 있는 벽의 이미지 주소가 return됨
  }, []);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? <Unity onGameEnd={openAttModal} /> : <WebcamTestPage onTestComplete={handleTestComplete} />}
      {modalOpen && <IsReady onClose={closeModal} />}
      {attModalOpen && <AttModal onClose={closeAttModal} />}
    </MainWrap>
  );
}

export default GamePage;
