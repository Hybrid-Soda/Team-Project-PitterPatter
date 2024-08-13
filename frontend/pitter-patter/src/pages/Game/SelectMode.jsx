import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../LandingPage/Header";
import { MainWrap, BoxWrap, ImageBox, GameImage, ItemName } from "./SelectModeStyle";
import snapshot from "../../assets/img/Game/snapshot.png";
import goGame from "../../assets/img/Game/goGame.png";
import GameModeModal from "./ModeSelectModal"; // GameModeModal 컴포넌트를 import 합니다
import BackgroundImg from "/src/assets/img/Background/YellowWave.png";

function SelectMode() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleGameStartClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <MainWrap style={{backgroundImage: `url(${BackgroundImg})`}}>
      <Header />
      <BoxWrap bgColor="var(--logo-pink-color)" onClick={handleGameStartClick}>
        <ImageBox shadow="4px 4px 27.5px 0px #933557 inset">
          <GameImage src={goGame} alt="goGame" style={{width: '150%'}} />
        </ImageBox>
        <ItemName color="#FFD8DF">게임 시작하기</ItemName>
      </BoxWrap>
      <Link to={"/game/snapshot"}>
        <BoxWrap bgColor="var(--box-green-color)">
          <ImageBox shadow="4px 4px 27.5px 0px #629D1B inset">
            <GameImage src={snapshot} alt="snapShot" />
          </ImageBox>
          <ItemName color="#629D1B">인생 네 컷 찍기</ItemName>
        </BoxWrap>
      </Link>
      {modalOpen && <GameModeModal onClose={closeModal} />}
    </MainWrap>
  );
}

export default SelectMode;
