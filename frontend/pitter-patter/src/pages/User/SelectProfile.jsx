import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutBase,
  LayoutProfileWrap,
  MainText,
  ProfileList,
  Profile,
  ProfileImage,
  IconPlus,
  UserId,
  LayoutMypage,
  MypageButton,
} from './SelectProfileStyle';
import PlusSquare from "../../assets/icons/PlusSquare.png";

import { childApi, userApi } from '../../apiService';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../redux/itemSlice';

function SelectProfile() {
  const navigate = useNavigate();

  const goMypage = () => {
    navigate('/SFA');
  };

  const goToAddProfile = () => {
    navigate('/child/mypage', { state: { addProfile: true } });
  };

  // redux: 유저 아이템 받아오기
  const token = useSelector((state) => state.token.refreshToken);
  const [childList, setChildList] = useState([]);

  const getChildList = async () => {
    try {
      const response = await childApi.get("", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setChildList(response.data);
      console.log(response.data);

    } catch (error) {
      console.log("Error fetching frames:", error.response.data.msg);
      alert(error.response.data.msg); // 에러 메시지 알림
    }
  };
  useEffect(() => {
    getChildList();
  }, []); // 빈 배열을 의존성 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 호출

  const selected = () => {};


  return (
    <LayoutBase>
      <LayoutProfileWrap>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MainText>플레이어를 선택해주세요.</MainText>
          <ProfileList>
            {childList.map((child) => (
              <Link to='/' style={{ alignItems: 'flex-start' }} key={child.id}>
                <Profile onClick={selected}>
                  <ProfileImage alt={`${child.userId} profile`} style={{overflow: 'hidden'}}>
                    <IconPlus src={child.profileImage} style={{width: '100%', height: '100%'}}></IconPlus>
                  </ProfileImage>
                  <UserId>{child.nickname}</UserId>
                </Profile>
              </Link>
            ))}
              <Profile onClick={goToAddProfile}>
                <ProfileImage className="profile-add">
                  <IconPlus src={PlusSquare} alt="PlusSquare" />
                </ProfileImage>
              </Profile>
          </ProfileList>
          <LayoutMypage>
            <MypageButton onClick={goMypage}>
              회원정보 수정
            </MypageButton>
          </LayoutMypage>
        </div>
      </LayoutProfileWrap>
    </LayoutBase>
  );
}

export default SelectProfile;
