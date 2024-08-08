import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { childApi } from '../../../apiService';
import axios from 'axios';

import {
  LayoutMyPage,
  Profile,
  MainImg,
  InputWrap,
  InputItem,
  InputTitle,
} from './UserInfoStyle';
import SingingBanana from "../../../assets/img/User/SingingBanana.png";

const InputBox = styled.input`
  width: 15vw;
  padding: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const SelectBox = styled.select`
  width: 15vw;
  padding: 0.5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const SubmitButton = styled.button`
  border-radius: 1.5rem;
  background-color: #FFD8DF;
  box-shadow: #FA6DA1 0 0.6vh;
  font-size: 1.2rem;
  height: 5vh;
  padding: 0.5rem 1.8rem;

  &:hover {
    box-shadow: #FA6DA1 0 0.4vh;
    transform: translateY(0.3vh);
  }

  &:active {
    box-shadow: #FA6DA1 0 0;
    transform: translateY(0.6vh);
  }

  transition: all 0.1s;
`;

const CancleButton = styled.button`
  border-radius: 1.5rem;
  background-color: #F6F6F6;
  box-shadow: #858585 0 0.6vh;
  font-size: 1.2rem;
  height: 5vh;
  padding: 0.5rem 1.8rem;

  &:hover {
    box-shadow: #858585 0 0.4vh;
    transform: translateY(0.3vh);
  }

  &:active {
    box-shadow: #858585 0 0;
    transform: translateY(0.6vh);
  }

  transition: all 0.1s;
`;

function ChildInfo() {
  const childId = useSelector((state) => state.child.id);
  const token = useSelector((state) => state.token.refreshToken);

  const [profileImage, setProfileImage] = useState(SingingBanana);
  const fileInputRef = useRef(null);

  const [nickname, setNickname] = useState('');
  const [birth, setbirth] = useState('');
  const [gender, setGender] = useState('MALE');

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const userProfileData = {
      nickname,
      birth,
      gender,
      profileImage,
    };

    if (!childId) {
      childApi.post('', userProfileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Profile added successfully:', response.data);
          // const childId = response.data.childId;
        })
        .catch(error => {
          console.error('There was an error adding the profile!', error);
          console.log(userProfileData)
        });
    } else {
      childApi.patch(`/${childId}`, userProfileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('Profile updated successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error updating the profile!', error);
        }); 
    }
  };

  return (
    <LayoutMyPage>
      <Profile>
        <MainImg
          src={profileImage}
          alt="SingingBanana"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </Profile>
      <InputWrap>
        <InputItem>
          <InputTitle>닉네임</InputTitle>
          <InputBox type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </InputItem>
        <InputItem>
          <InputTitle>생년월일</InputTitle>
          <InputBox type="date" placeholder="생년월일" value={birth} onChange={(e) => setbirth(e.target.value)} />
        </InputItem>
        <InputItem>
          <InputTitle>성별</InputTitle>
          <SelectBox value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="MALE">남자</option>
            <option value="FEMALE">여자</option>
          </SelectBox>
        </InputItem>
      </InputWrap>
      <Profile style={{ background: 'none', height: '13vh', width: '30vw', gap: '1.5rem' }}>
        <CancleButton>취소</CancleButton>
        <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
      </Profile>
    </LayoutMyPage>
  );
}

export default ChildInfo;
