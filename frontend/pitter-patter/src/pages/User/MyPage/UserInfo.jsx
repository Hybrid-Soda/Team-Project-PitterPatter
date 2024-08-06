import React from 'react';
import styled from 'styled-components';

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
  return (
    <LayoutMyPage>
      <Profile>
        <MainImg src={SingingBanana} alt="SingingBanana" />
      </Profile>
      <InputWrap>
        <InputItem>
          <InputTitle>아이디</InputTitle>
          <InputBox type="text" placeholder="아이디" />
        </InputItem>
        {/* <InputItem>
          <InputTitle>가입일</InputTitle>
          <InputBox type="date" placeholder="created-at" />
        </InputItem> */}
        <InputItem>
          <InputTitle>가족 팀 이름</InputTitle>
          <InputBox type="text" placeholder="팀이름" />
        </InputItem>
      </InputWrap>
      <Profile style={{background: 'none', height: '13vh'}}>
        <SubmitButton>저장</SubmitButton>
      </Profile>
    </LayoutMyPage>
  )
}

export default UserInfo;
