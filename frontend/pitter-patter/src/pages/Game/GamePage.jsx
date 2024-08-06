import React, { useState, useEffect } from "react";
import { MainWrap } from "./GamePageStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import WebcamTestPage from "../Game/WebcamTestPage";
import Unity from "./Unity";

function GamePage() {
  const [modalOpen, setModalOpen] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false)
  const handleTestComplete = () => {
    setTestCompleted(true)
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setModalOpen(true); // 페이지 접근 시 모달 창 열기
  }, []);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? <Unity /> : <WebcamTestPage onTestComplete={handleTestComplete} />}
      {modalOpen && <IsReady onClose={closeModal} />}
    </MainWrap>
  );
}

export default GamePage;
