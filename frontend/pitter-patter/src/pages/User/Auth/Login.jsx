import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  LayoutBase,
  LayoutLogin,
  MainText,
  ButtonLogin,
  ForgotPassword,
  SignUp,
} from './LoginStyle.jsx';
import X from "../../../assets/img/logo/X.png";
import kakao from "../../../assets/img/logo/kakao.png";
import naver from "../../../assets/img/logo/naver.png"; 
import Modal from './LoginFailModal.jsx'; 

import { login } from "/src/pages/User/userApi.js";

const IconX = styled.img`
  width: 1.5vw;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
  position: absolute;
`;

const InputText = styled.input`
  padding: 1vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
`;

const CenterText = styled.span`
  font-size: 1vw;
  color: #757575;
  margin: 2vh 0;
`;

const SocialIcon = styled.img`
  width: 3vw;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

function Login() {
  const navigator = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        navigator('/');
      }
    } catch (error) {
      console.error(error);
      setModalMessage('로그인 실패. 다시 시도해주세요.');
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <LayoutBase>
      <LayoutLogin>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '80%' }}>
          <Link to='/'><IconX src={X} alt="X" /></Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <MainText>로그인</MainText>
        </div>
        <div style={{ marginBottom: '1vw' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5vw' }}>
          <InputText
            type="text"
            id="id"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', width: '100%' }}>
            <ForgotPassword href="/forgot-password">비밀번호를 잊으셨나요?</ForgotPassword>
          </div>
          <ButtonLogin onClick={handleLogin}>로그인</ButtonLogin>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <SignUp>
              계정이 없으신가요? <a href="/signup">회원가입</a>
            </SignUp>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CenterText>또는</CenterText>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <SocialIcon src={kakao} alt="kakao" />
            <SocialIcon src={naver} alt="naver" />
          </div>
        </div>
      </LayoutLogin>
      {modalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </LayoutBase>
  );
}

export default Login;
