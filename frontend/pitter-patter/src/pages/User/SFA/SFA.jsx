import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  LayoutBase,
  LayoutSFA,
  DotWrap,
  PasswordDot,
  NumpadWrap,
  NumpadRow,
  Numpad,
  IconBackspace,
  ForgotPassword,
  IconX
} from './SFAStyle';
import ArrowLeft from "../../../assets/icons/ArrowLeft.png";
import BackSpace from "../../../assets/icons/BackSpace.png";
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import ForgotSFAmodal from './ForgotSFAmodal';

import { verify2fa } from "/src/pages/User/userApi.js";

function SFA() {
  const navigator = useNavigate();

  const [password, setPassword] = useState("");
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isInitialPassword, setIsInitialPassword] = useState(false); // 초기 비밀번호 상태 추가

  const {accessToken } = useSelector((state) => state.token);

  useEffect(() => {
    // 페이지가 로드될 때 0000 비밀번호 자동 검증
    const checkInitialPassword = async () => {
      const response = await verify2fa(accessToken, "0000");
      if (response.status === 200 && response.data.exception === undefined) {
        handleMessage("초기 비밀번호입니다. 새로운 비밀번호를 설정해주세요.", true);
      }
    };

    checkInitialPassword();
  }, []);

  useEffect(() => {
    const verifyPassword = async () => {
      if (password.length === 4) {
        const isVerified = await isVerifiedSFA();
        setPassword('');
        if (isVerified) {
          navigator('/mypage');
        }
      }
    };

    verifyPassword();
  }, [password]);

  const goBack = () => {
    navigator(-1); // 뒤로가기 기능
  };

  const handleKeyPress = (value) => {
    if (password.length < 4) {
      setPassword(password + value);
    }
  };

  const handleBackspace = () => {
    setPassword(password.slice(0, -1));
  };

  const isVerifiedSFA = async () => {
    try {
      const response = await verify2fa(accessToken, password);
  
      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.msg;
  
        if (exception === undefined) {
          if (password === "0000") {
            openModal("초기 비밀번호입니다. 새로운 비밀번호를 설정해주세요.", true);
            return false; // 비밀번호가 0000일 때는 페이지 이동을 위해 false 반환
          }
          return true;
        } else {
          openModal(msg, false); // 일반 오류 메시지의 경우 false로 설정
          return false;
        }
      } else {
        openModal("예기치 못한 오류로 2차 비밀번호를 검증하는데 실패했습니다.", false);
        return false;
      }
    } catch (error) {
      if (!(error.response && error.response.status === 401) && !(error.msg && error.msg === "토큰 검증 실패")) {
        openModal("문제가 발생했습니다. 다시 시도해주세요.");
      }
      return false;
    }
  };
  
  const openModal = (msg, isInitialPassword = false) => {
    setModalMessage(msg);
    setIsModalOpen(true);
    setIsInitialPassword(isInitialPassword); // 초기 비밀번호 여부 설정
  };
  
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (isInitialPassword) {
      navigator('/NewSFA'); // 초기 비밀번호일 때만 페이지 이동
    }
  };

  return (
    <LayoutBase>
      <LayoutSFA>
        <div style={{ height: "10vh", display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <button onClick={goBack}><IconX src={ArrowLeft} alt="ArrowLeft" /></button>
        </div>
        <span style={{ fontSize: '1.3vw' }} >2차 비밀번호를 입력해주세요</span>
        <DotWrap>
          {[...Array(4)].map((_, i) => (
            <PasswordDot key={i} className={i < password.length ? 'filled' : ''}></PasswordDot>
          ))}
        </DotWrap>
        <NumpadWrap>
          <NumpadRow>
            <Numpad onClick={() => handleKeyPress(1)}>1</Numpad>
            <Numpad onClick={() => handleKeyPress(2)}>2</Numpad>
            <Numpad onClick={() => handleKeyPress(3)}>3</Numpad>
          </NumpadRow>
          <NumpadRow>
            <Numpad onClick={() => handleKeyPress(4)}>4</Numpad>
            <Numpad onClick={() => handleKeyPress(5)}>5</Numpad>
            <Numpad onClick={() => handleKeyPress(6)}>6</Numpad>
          </NumpadRow>
          <NumpadRow>
            <Numpad onClick={() => handleKeyPress(7)}>7</Numpad>
            <Numpad onClick={() => handleKeyPress(8)}>8</Numpad>
            <Numpad onClick={() => handleKeyPress(9)}>9</Numpad>
          </NumpadRow>
          <NumpadRow>
            <Numpad></Numpad>
            <Numpad onClick={() => handleKeyPress(0)}>0</Numpad>
            <Numpad onClick={handleBackspace}>
              <IconBackspace src={BackSpace} alt="BackSpace" />
            </Numpad>
          </NumpadRow>
        </NumpadWrap>
        <ForgotPassword>
          <button onClick={() => setForgotModalOpen(true)}>비밀번호를 잊으셨나요?</button>
        </ForgotPassword>
        {forgotModalOpen && <ForgotSFAmodal onClose={() => setForgotModalOpen(false)} onMessage={openModal} />}
        {isModalOpen && <Modal message={modalMessage} onClose={handleModalConfirm} />}
      </LayoutSFA>
    </LayoutBase>
  );
}

export default SFA;
