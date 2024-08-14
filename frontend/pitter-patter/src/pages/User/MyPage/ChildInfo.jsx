import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { childApi } from '../../../apiService';
import { hostApi } from '../../../apiService';
import { useNavigate } from 'react-router-dom';
import { setChild } from '../../../redux/childSlice';
import { useDispatch } from 'react-redux';
import Loader from '/src/pages/Components/smallLoader'; // 로딩 컴포넌트 임포트

import {
  LayoutMyPage,
  Profile,
  MainImg,
  InputWrap,
  InputItem,
  InputTitle,
} from './UserInfoStyle';
import SingingBanana from "/src/assets/img/User/SingingBanana.png";
import PointerImg from "/src/assets/cursor/pointer.png";
import PlusSquare from "/src/assets/icons/PlusSquare.png";


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
  const token = useSelector((state) => state.token.accessToken);
  const childData = useSelector((state) => state.child);

  const [profileImage, setProfileImage] = useState(SingingBanana);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('MALE');

  const dispatch = useDispatch();

  useEffect(() => {
    if (childId) {
      setNickname(childData.nickname || '');
      setBirth(childData.birth || '');
      setGender(childData.gender || 'MALE');
      setProfileImage(childData.profileImage || SingingBanana);
    }
  }, [childId, childData]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true); // 로딩 시작
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await hostApi.post(`/api/image/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        const imageUrl = response.data.url; // 서버에서 반환된 이미지 URL
        setProfileImage(imageUrl);
        console.log(profileImage);
      } catch (error) {
        console.error('There was an error uploading the image!', error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    }
  };

  const handleSubmit = async () => {
    const userProfileData = {
      nickname,
      birth,
      gender,
      profileImage, // 업로드된 이미지의 URL을 포함
    };
  
    try {
      if (!childId) {
        const response = await childApi.post('', userProfileData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Profile added successfully:', response.data);
        goBack();
      } else {
        const response = await childApi.patch(`/${childId}`, userProfileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile updated successfully:', response.data);
  
        // 프로필 업데이트 후 해당 childId로 정보를 다시 가져옴
        const childInfoResponse = await childApi.get(`/${childId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const childInfo = childInfoResponse.data;
        console.log(childInfo);
  
        // Redux 상태 업데이트
        dispatch(setChild(childInfo));
        goHome();
      }
    } catch (error) {
      if (!childId) {
        console.error('There was an error adding the profile!', error);
      } else {
        console.error('There was an error updating the profile!', error);
      }
    }
  };
  

  const navigation = useNavigate();
  const goBack = () => {
    navigation(-1);
  };
  const goHome = () => {
    navigation('/');
  };

  return (
    <LayoutMyPage>
      <Profile style={{ cursor: `url(${PointerImg}), pointer !important` }}>
        {loading ? (
          <Loader /> 
        ) : (
          <MainImg
            src={profileImage === SingingBanana ? PlusSquare : profileImage}
            alt="profileImage"
            onClick={handleImageClick}
            // style={{ cursor: `url(${PointerImg}), pointer !important` }}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ cursor: `url(${PointerImg}), pointer !important`, display: 'none' }}
        />
      </Profile>
      <InputWrap>
        <InputItem>
          <InputTitle>닉네임</InputTitle>
          <InputBox type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </InputItem>
        <InputItem>
          <InputTitle>생년월일</InputTitle>
          <InputBox type="date" placeholder="생년월일" value={birth} onChange={(e) => setBirth(e.target.value)} />
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
        <CancleButton onClick={goBack}>취소</CancleButton>
        <SubmitButton onClick={handleSubmit}>저장</SubmitButton>
      </Profile>
    </LayoutMyPage>
  );
}

export default ChildInfo;
