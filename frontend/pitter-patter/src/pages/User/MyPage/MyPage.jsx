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

import { deleteUser } from "/src/pages/User/userApi.js";

function MyPage() {
  const Navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('userInfo');

  // 추후 redux에서 가져와야할 정보들
  const [accessToken, setAccessToken] = useState('access token');

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };

  const handleModalOpen = async () => {
    const isDeleted = await handleDeleteUser();
    if (isDeleted) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
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
          alert(msg);
          return false;
        }
      } else {
        alert("회원탈퇴에 실패했습니다.");
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // intercetor에서 토큰 재발급 수행
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigator("/");
      } else if (error.msg && error.msg === "토큰 검증 실패") {
        // intercetor에서 토큰 재발급 수행
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigator("/");
      } else {
        alert("문제가 발생했습니다. 다시 시도해주세요.");
        return false;
      }
    }
  };

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
              <button
                onClick={handleModalOpen}
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
