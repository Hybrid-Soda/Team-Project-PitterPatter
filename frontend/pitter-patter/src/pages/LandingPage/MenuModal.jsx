import React from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 25%;
  background: white;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavXContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1001;
`;

const NavItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 15vw;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

const NavIcon = styled.img`
  width: 50%;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const NavText = styled.div`
  font-size: 1rem;
`;

const LayoutNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  flex: 1; 
`;

const CloseButtonImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
`

import Game from '/src/assets/img/NavBar/toGame.png';
import Market from '/src/assets/img/NavBar/toMarket.png';
import Mypage from '/src/assets/img/NavBar/toMypage.png';
import Attendance from '/src/assets/img/NavBar/toAttendance.png';
import Ranking from '/src/assets/img/NavBar/toRanking.png';

function MenuModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <BackDrop onClick={onClose} />
      <Navbar>
        <LayoutNav>
          <Link to={isLoggedIn ? '/game/select-mode' : '/login'}>
            <NavItemWrap>
              <NavIcon src={Game} alt="game" />
              <NavText>게임 시작하기</NavText>
            </NavItemWrap>
          </Link>
          <Link to={isLoggedIn ? '/shop' : '/login'}>
            <NavItemWrap>
              <NavIcon src={Market} alt="market" />
              <NavText>상점 둘러보기</NavText>
            </NavItemWrap>
          </Link>
          <Link to={isLoggedIn ? '/rank' : '/login'}>
            <NavItemWrap>
              <NavIcon src={Ranking} alt="ranking" />
              <NavText>랭킹 확인하기</NavText>
            </NavItemWrap>
          </Link>
          <Link to={isLoggedIn ? '/attendance' : '/login'}>
            <NavItemWrap>
              <NavIcon src={Attendance} alt="attendance" />
              <NavText>출석 체크</NavText>
            </NavItemWrap>
          </Link>
          <Link to={isLoggedIn ? '/sfa-child' : '/login'}>
            <NavItemWrap>
              <NavIcon src={Mypage} alt="mypage" />
              <NavText>보호자 페이지</NavText>
            </NavItemWrap>
          </Link>
        </LayoutNav>
      </Navbar>
      <NavXContainer>
        <CloseButtonImg src="/src/assets/icons/X.png" alt="close" onClick={onClose} />
      </NavXContainer>
    </>
  );
}

export default MenuModal;
