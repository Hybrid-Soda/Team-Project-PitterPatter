import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isAddProfile = location.state?.addProfile || false;
  const [profileImage, setProfileImage] = useState(SingingBanana);
  const fileInputRef = useRef(null);

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
      // 여기에 전송할 데이터 작성
    };

    if (isAddProfile) {
      axios.post('/api/profile', userProfileData)
        .then(response => {
          console.log('Profile added successfully:', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the profile!', error);
        });
    } else {
      axios.patch('/api/profile', userProfileData)
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
          <InputTitle>이름</InputTitle>
          <InputBox type="text" placeholder="이름" />
        </InputItem>
        <InputItem>
          <InputTitle>닉네임</InputTitle>
          <InputBox type="text" placeholder="닉네임" />
        </InputItem>
        <InputItem>
          <InputTitle>생년월일</InputTitle>
          <InputBox type="date" placeholder="생년월일" />
        </InputItem>
        <InputItem>
          <InputTitle>성별</InputTitle>
          <SelectBox>
            <option value="male">남자</option>
            <option value="female">여자</option>
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
