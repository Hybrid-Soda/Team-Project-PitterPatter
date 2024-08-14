import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import PointerImg from "/src/assets/cursor/pointer.png";

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
  cursor: url(${PointerImg}), pointer !important;
  transition: opacity .3s;
  opacity: ${({ isHovered, isNoneHovered }) => isNoneHovered || isHovered ? 1 : 0.5};
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
  cursor: url(${PointerImg}), pointer !important;
`;

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
`;

import Game from '/src/assets/img/NavBar/toGame.png';
import Market from '/src/assets/img/NavBar/toMarket.png';
import Mypage from '/src/assets/img/NavBar/toMypage.png';
import Attendance from '/src/assets/img/NavBar/toAttendance.png';
import Ranking from '/src/assets/img/NavBar/toRanking.png';

import xIcon from "/src/assets/icons/X.png";

function MenuModal({ isOpen, onClose }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <BackDrop onClick={onClose} />
      <Navbar>
        <LayoutNav>
          {[
            { to: '/game/select-mode', src: Game, text: '게임 시작하기' },
            { to: '/shop', src: Market, text: '상점 둘러보기' },
            { to: '/rank', src: Ranking, text: '랭킹 확인하기' },
            { to: '/attendance', src: Attendance, text: '출석 체크' },
            { to: '/sfa-child', src: Mypage, text: '보호자 페이지' }
          ].map((item, index) => (
            <Link to={item.to} key={index}>
              <NavItemWrap
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredIndex === index}
                isNoneHovered={hoveredIndex === null}
              >
                <NavIcon src={item.src} alt={item.text} />
                <NavText>{item.text}</NavText>
              </NavItemWrap>
            </Link>
          ))}
        </LayoutNav>
      </Navbar>
      <NavXContainer>
        <CloseButtonImg src={xIcon} alt="close" onClick={onClose} />
      </NavXContainer>
    </>
  );
}

export default MenuModal;
