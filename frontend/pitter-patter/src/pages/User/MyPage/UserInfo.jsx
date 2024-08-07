import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LayoutMyPage,
  Profile,
  MainImg,
  InputWrap,
  InputItem,
  InputTitle,
} from './UserInfoStyle';
import SingingBanana from "../../../assets/img/User/SingingBanana.png";

import { updateUser, reissueJwtToken } from "/src/pages/User/userApi.js";

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
    box-shadow: #FA6DA1 0 .6vh;
    font-size: 1.2rem;
    height: 5vh;
    padding: .5rem 1.8rem;

    &:hover {
      box-shadow: #FA6DA1 0 .4vh;
      transform: translateY(.3vh);
    }

    &:active {
      box-shadow: #FA6DA1 0 0;
      transform: translateY(.6vh);
    }

    transition: all .1s;
`

function UserInfo() {
  const navigator = useNavigate();

  // 추후 redux에서 가져와야할 정보들
  const [teamName, setTeamName] = useState('테스트2');
  const email = "wlgjs8474@naver.com";
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleSubmit = async () => {
    await updateTeamName();
  };

  const updateTeamName = async () => {
    try {
      const response = await updateUser(accessToken, {teamName});
      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.msg;

        if (exception === undefined) {
          const updatedUserInfo = response.data.data;

          // 업데이트 된 사용자 정보를 redux에 갱신
          // ...

          setTeamName(updatedUserInfo.teamName);
          alert("회원정보가 성공적으로 변경되었습니다.");
        } else {
          alert(msg);
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // 토큰 재발급 후 다시 요청
          const isCompleted = await doReissue();

          if (isCompleted) {
            await updateTeamName();
          } else {
            // TODO: 로그아웃 처리
            alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
            navigator("/login");
          }
        }
      }
      alert("문제가 발생했습니다. 다시 시도해주세요.");
      handleError(error);
    }
  }

  const doReissue = async () => {
    try {
      const response = await reissueJwtToken(refreshToken);

      if (response.status === 200) {
        const exception = response.data.exception;

        if (exception === undefined) {
          const reissuedJwtToken = response.data.data;
          
          // 재발급한 JWT 토큰을 redux에 저장
          // ...

          setAccessToken(reissuedJwtToken.accessToken);
          setRefreshToken(reissuedJwtToken.refreshToken);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      handleError(error);
      return false;
    }
  }
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
    <LayoutMyPage>
      <Profile>
        <MainImg src={SingingBanana} alt="SingingBanana" />
      </Profile>
      <InputWrap>
        <InputItem>
          <InputTitle>아이디</InputTitle>
          <InputBox type="text" value={email} disabled />
        </InputItem>
        {/* <InputItem>
          <InputTitle>가입일</InputTitle>
          <InputBox type="date" placeholder="created-at" />
        </InputItem> */}
        <InputItem>
          <InputTitle>가족 팀 이름</InputTitle>
          <InputBox 
            type="text"
            placeholder="팀이름"
            value={teamName}
            onChange={(e) => {setTeamName(e.target.value)}}
          />
        </InputItem>
      </InputWrap>
      <Profile style={{background: 'none', height: '13vh'}}>
        <SubmitButton onClick={handleSubmit}>
          저장
        </SubmitButton>
      </Profile>
    </LayoutMyPage>
  )
}

export default UserInfo;
