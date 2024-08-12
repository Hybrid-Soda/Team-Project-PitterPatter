import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
import DeleteUser from './DeleteUser';

import { deleteUser} from "/src/pages/User/userApi.js";
import { handleReissueCatch } from '../../../apiService';

function MyPage() {
  const Navigate = useNavigate();
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('userInfo');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 

  const {accessToken } = useSelector((state) => state.token);

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const handleModalOpen = async () => {
    const isDeleted = await handleDeleteUser();
    if (isDeleted) {
      setForgotModalOpen(true);
    } else {
      setForgotModalOpen(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(accessToken);

      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.exception;

        if (exception === undefined) {
          return true;
        } else {
          handleMessage(msg);
          return false;
        }
      } else {
        handleMessage("회원탈퇴에 실패했습니다.");
        return false;
      }
    } catch (error) {
      handleReissueCatch(error);
      return false;
    }
  };

  const handleMessage = (msg) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <LayoutBase>
      <LayoutMyPage>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
          <MenuWrap>
            <button onClick={() => Navigate(-1)}>
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
              <button
                onClick={handleModalOpen}
                style={{ border: 'none', background: 'none', padding: 0 }}
              >
                <MenuItem>회원 탈퇴</MenuItem>
              </button>
              </MenuItemWrap>
              {forgotModalOpen && <DeleteUser onClose={() => setForgotModalOpen(false)} />}
          </MenuWrap>
          <MainWrap>
            {activeComponent === 'userInfo' && <UserInfo onMessage={handleMessage} />}
            {(activeComponent === 'changePassword' || activeComponent === 'changePassword2') && <ChangePassword onMessage={handleMessage} />}
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
