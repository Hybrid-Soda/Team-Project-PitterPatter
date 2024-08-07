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

import { childApi } from '../../apiService';

import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../redux/itemSlice';
import { getChild } from '../../redux/childSlice';

function SelectProfile() {
  const navigate = useNavigate();

  const goMypage = () => {
    navigate('/SFA');
  };

  const goToAddProfile = () => {
    navigate('/child/mypage', { state: { addProfile: true } });
  };

  // redux: 유저 아이템 받아오기
  const dispatch = useDispatch();
  const getProfile = () => {
        dispatch(getItem());
        dispatch(getChild());
  };

  return (
    <LayoutBase>
      <LayoutProfileWrap>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MainText>플레이어를 선택해주세요.</MainText>
          <ProfileList>
            <Link to='/' style={{ alignItems: 'flex-start' }}>
              <Profile onClick={getProfile}>
                <ProfileImage />
                <UserId>user01</UserId>
              </Profile>
            </Link>
            <Profile>
              <ProfileImage />
              <UserId>user02</UserId>
            </Profile>
            <Profile>
              <ProfileImage />
              <UserId>user03</UserId>
            </Profile>
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
