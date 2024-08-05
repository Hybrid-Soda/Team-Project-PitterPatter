import React from 'react';
import styled from 'styled-components';
import {
  LayoutBase,
  LayoutSignup,
  MainText,
  ButtonCheckId,
  ButtonSignup,
  LoginText,
} from './SignUpStyle';
import { Link } from 'react-router-dom';
import X from "../../../assets/img/logo/X.png";
import kakao from "../../../assets/img/logo/kakao.png";
import naver from "../../../assets/img/logo/naver.png";

const IconX = styled.img`
  width: 1.5vw;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

const InputText = styled.input`
  padding: 1vw;
  margin: .5vw 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const CenterText = styled.span`
  font-size: 1vw;
  color: #757575;
  margin: 1.5vw 0;
`;

const SocialIcon = styled.img`
  width: 3vw;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

function SignUp() {
  return (
    <LayoutBase>
      <LayoutSignup>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '90%' }}>
          <Link to='/'><IconX src={X} alt="X" /></Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <MainText>회원 가입</MainText>
        </div>
        <div style={{ marginBottom: '2vw' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0vw' }}>
          <InputText
            type="text"
            id="id"
            placeholder="아이디"
          />
          <ButtonCheckId id="button-check-id">중복 확인</ButtonCheckId>
          <InputText
            type="password"
            id="password"
            placeholder="비밀번호"
          />
          <InputText
            type="password"
            id="password-check"
            placeholder="비밀번호 확인"
          />
          <ButtonSignup id="button-signup">회원 가입</ButtonSignup>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <LoginText>
              이미 계정이 있으신가요? <a href="/login">로그인</a>
            </LoginText>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CenterText>또는</CenterText>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <SocialIcon src={kakao} alt="kakao" />
            <SocialIcon src={naver} alt="naver" />
          </div>
        </div>
      </LayoutSignup>
    </LayoutBase>
  );
}

export default SignUp;
