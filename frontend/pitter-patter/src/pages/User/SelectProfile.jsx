import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  // LayoutSearch,
  // SearchInput,
  // SearchButton,
} from './SelectProfileStyle';
import PlusSquare from "../../assets/icons/PlusSquare.png";

function SelectProfile() {
  const navigate = useNavigate();
  const goMypage = () => {
    navigate('/SFA');
  }

  return (
    <LayoutBase>
      <LayoutProfileWrap>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MainText>플레이어를 선택해주세요.</MainText>
          <ProfileList>
            <Link to='/' style={{alignItems: 'flex-start'}}>
              <Profile>
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
            <Profile>
              <ProfileImage className="profile-add">
                <IconPlus src={PlusSquare} alt="PlusSquare" />
              </ProfileImage>
            </Profile>
          </ProfileList>
          <LayoutMypage>
            <MypageButton onClick={goMypage}>
              마이 페이지로 이동하기
            </MypageButton>
          </LayoutMypage>
        </div>
      </LayoutProfileWrap>
    </LayoutBase>
  );
}

export default SelectProfile;
