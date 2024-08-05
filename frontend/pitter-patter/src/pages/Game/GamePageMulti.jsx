import { MainWrap, MyGame, OpponentGame } from "./GamePageMultiStyle";
import Header from "../LandingPage/Header";
import IsReady from "../Game/IsReady";
import { useState, useEffect } from "react";

function GamePageMulti() {
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
      <MyGame />
      <OpponentGame />
      {modalOpen && <IsReady onClose={closeModal} />}
    </MainWrap>
  );
}

export default GamePageMulti;
