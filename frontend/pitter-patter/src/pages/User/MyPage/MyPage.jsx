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
  // 토큰 재발급 미구현
  const [accessToken, setAccessToken] = useState('access token');
  const [refreshToken, setRefreshToken] = useState('refresh token');

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
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      handleError(error);
      return false;
    }
  };

  const handleError = (error) => {
    // 오류 처리
    if (error.response) {
     // 서버가 응답을 반환했지만 상태 코드가 2xx 범위가 아님
     console.error('Error Response Status:', error.response.status);
     console.error('Error Response Data:', error.response.data);
     console.error('Error Response Headers:', error.response.headers);
   } else if (error.request) {
     // 요청은 성공적으로 전송되었지만 응답을 받지 못함
     console.error('Error Request:', error.request);
   } else {
     // 요청 설정에서 발생한 오류
     console.error('Error Message:', error.message);
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
