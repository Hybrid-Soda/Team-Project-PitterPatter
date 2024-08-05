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
import ArrowLeft from "../../../assets/icons/ArrowLeft.png";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePassword"
import DeleteUser from './DeleteUser';

function MyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const [activeComponent, setActiveComponent] = useState('userInfo');
  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const Navigate = useNavigate();

  return (
    <LayoutBase>
      {/* <DeleteUser /> */}
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
              <MenuItem>
                <Link to="/child">자녀 정보 확인</Link>
              </MenuItem>
              <button
                onClick={() => setModalOpen(true)}
                style={{ border: 'none', background: 'none', padding: 0 }}
              >
                <MenuItem>회원 탈퇴</MenuItem>
              </button>
              </MenuItemWrap>
              {modalOpen && <DeleteUser onClose={() => setModalOpen(false)} />}
          </MenuWrap>
          <MainWrap>
            {activeComponent === 'userInfo' && <UserInfo />}
            {(activeComponent === 'changePassword' || activeComponent === 'changePassword2') && <ChangePassword />}
          </MainWrap>
        </div>
      </LayoutMyPage>
    </LayoutBase>
  );
}

export default MyPage;
