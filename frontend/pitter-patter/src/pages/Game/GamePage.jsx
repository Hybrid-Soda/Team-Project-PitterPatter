import { MainWrap, Game } from "./GamePageStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import { useState, useEffect } from "react";

function GamePage() {
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setModalOpen(true); // 페이지 접근 시 모달 창 열기
  }, []);

  return (
    <MainWrap>
      <Header />
      <Game />
      {modalOpen && <IsReady onClose={closeModal} />}
    </MainWrap>
  );
}

export default GamePage;
