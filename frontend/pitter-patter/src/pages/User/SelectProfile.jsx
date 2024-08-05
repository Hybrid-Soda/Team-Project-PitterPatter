import React from 'react';
import {
  LayoutBase,
  LayoutProfileWrap,
  MainText,
  ProfileList,
  Profile,
  ProfileImage,
  IconPlus,
  UserId,
} from './SelectProfileStyle';
import PlusSquare from "../../assets/icons/PlusSquare.png";

function SelectProfile() {
  return (
    <LayoutBase>
      <LayoutProfileWrap>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MainText>플레이어를 선택해주세요.</MainText>
          <ProfileList>
            <Profile>
              <ProfileImage />
              <UserId>user01</UserId>
            </Profile>
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
        </div>
      </LayoutProfileWrap>
    </LayoutBase>
  );
}

export default SelectProfile;
