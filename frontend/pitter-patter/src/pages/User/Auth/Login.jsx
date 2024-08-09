import { useState, useRef } from 'react';
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

import { setToken } from '../../../redux/tokenSlice.js';
import { useDispatch } from 'react-redux';


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
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    // 아이디 필수 입력
    if (email === "" || email === undefined) {
      setModalMessage("아이디를 입력해주세요.");
      setModalOpen(true);
      emailInputRef.current.focus();
      return;
    }
    
    // 비밀번호 필수 입력
    if (password === "" || password === undefined) {
      setModalMessage("비밀번호를 입력해주세요.");
      setModalOpen(true);
      passwordInputRef.current.focus();
      return;
    }

    if (!isEmailValid()) {
      setModalMessage("올바른 이메일 주소 형식으로 다시 입력해 주세요.");
      setModalOpen(true);
      emailInputRef.current.focus();
      return;
    }

    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        // jwt 토큰을 여기서 받아옴
        const data = response.data.data;
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        const grantType = data.grantType;

        // jwt 토큰을 여기서 redux에 저장시켜야 함
        dispatch(setToken({
          grantType,
          accessToken,
          refreshToken,
        })
      );
        navigator("/select-profile");
      } else {
        setModalMessage('로그인에 실패했습니다. 다시 시도해주세요.');
        setModalOpen(true);
      }
    } catch (error) {
      const msg = error.response.data.msg;
      if (msg === "자격 증명에 실패하였습니다.") {
        setModalMessage("아이디 혹은 비밀번호가 틀렸습니다.");
        setModalOpen(true);
      }
      else {
        setModalMessage("문제가 발생했습니다. 다시 시도해주세요.");
        setModalOpen(true);
      }
    }
  };

  const isEmailValid = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

 // 추후 구현
 const test = async () => {
  alert("카카오 소셜 로그인 클릭");
}


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
            ref={emailInputRef}
          />
          <InputText
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordInputRef}
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
            <SocialIcon src={kakao} alt="kakao" onClick={test}/>
            {/* <SocialIcon src={naver} alt="naver" /> */}
          </div>
        </div>
      </LayoutLogin>
      {modalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </LayoutBase>
  );
}

export default Login;
