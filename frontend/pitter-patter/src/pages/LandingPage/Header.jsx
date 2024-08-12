import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeaderBody,
  LayoutHeader,
  LogoImg,
  LayoutHeaderButton,
  HeaderButton
} from './LandingPageStyle';
import Logo from '../../assets/img/logo/logo.png';
import UserIcon from '../../assets/icons/User.png';
import MenuIcon from '../../assets/icons/Menu.png';
import ProfileModal from './ProfileModal';
import MenuModal from './MenuModal';

import { useSelector } from'react-redux';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const childProfileImage = useSelector((state) => state.child.profileImage);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  return (
    <HeaderBody>
      <LayoutHeader>
        <Link to='/'>
          <LogoImg src={Logo} alt="Logo" />
        </Link>
        <LayoutHeaderButton>
          <HeaderButton src={childProfileImage || UserIcon} alt="User" onClick={toggleModal} style={{border: '.1rem solid lightgray'}}/>
          <HeaderButton src={MenuIcon} alt="Menu" onClick={toggleMenu} style={{marginRight: '1rem'}}/>
          <MenuModal isOpen={isMenuOpen} onClose={toggleMenu} />
        </LayoutHeaderButton>
      </LayoutHeader>
      <ProfileModal isOpen={isModalOpen} onClose={toggleModal} />
    </HeaderBody>
  );
}

export default Header;
