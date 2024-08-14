import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutBase,
  LayoutMyPage,
  MenuWrap,
  MenuIcon,
  MenuItemWrap,
  MenuItem,
  MainWrap,
} from './MyPageStyle';
import Modal from '../../Components/modal';
import ArrowLeft from "../../../assets/icons/ArrowLeft.png";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword"

function MyPage() {
  const navigator = useNavigate();
  const [activeComponent, setActiveComponent] = useState('userInfo');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const openModal = (msg) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "사용자 정보를 가져올 수 없습니다.") {
      navigator("/");
    }
  }

  return (
    <LayoutBase>
      <LayoutMyPage>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
          <MenuWrap>
            <button onClick={() => navigator(-1)}>
              <MenuIcon src={ArrowLeft} alt="ArrowLeft" />
            </button>
            <MenuItemWrap>
              <MenuItem
                color={activeComponent === 'userInfo' ? 'white' : 'initial'}
                onClick={() => handleMenuItemClick('userInfo')}
              > 
              프로필 수정               
              </MenuItem>
              <MenuItem
                color={activeComponent === 'changePassword' ? 'white' : 'initial'}
                onClick={() => handleMenuItemClick('changePassword')}
              >
                비밀번호 변경
              </MenuItem>
              <MenuItem>
                <Link to="/NewSFA">2차 비밀번호 변경</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/delete-user">회원 탈퇴</Link>
              </MenuItem>
              </MenuItemWrap>
          </MenuWrap>
          <MainWrap>
            {activeComponent === 'userInfo' && <UserInfo onMessage={openModal} />}
            {(activeComponent === 'changePassword' || activeComponent === 'changePassword2') && <ChangePassword onMessage={openModal} />}
          </MainWrap>
        </div>
        {isModalOpen && (
          <Modal title="알림" onClose={closeModal}>
            {modalMessage}
          </Modal>
        )}
      </LayoutMyPage>
    </LayoutBase>
  );
}

export default MyPage;
