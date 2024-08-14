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
import ForgotSFAmodal from './ForgotSFAmodal';
import Modal from './Modal';

import { verify2fa } from "/src/pages/User/userApi.js";

function SFAChild() {
  const navigator = useNavigate();

  const [password, setPassword] = useState("");
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isInitialPassword, setIsInitialPassword] = useState(false); // 초기 비밀번호 여부를 판단하기 위한 상태 변수 추가

  const {accessToken } = useSelector((state) => state.token);

  // 페이지 로드 시 "0000" 비밀번호로 검증
  useEffect(() => {
    const checkInitialPassword = async () => {
      try {
        const response = await verify2fa(accessToken, "0000");
        if (response.status === 200 && response.data.exception === undefined) {
          openModal("초기 비밀번호입니다. 새로운 비밀번호를 설정해주세요.", true);
        }
      } catch (error) {
        if (!(error.response && error.response.status === 401) && !(error.msg && error.msg === "토큰 검증 실패")) {
          openModal("문제가 발생했습니다. 다시 시도해주세요.");
        }
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
          navigator('/child');
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
            return false; // 초기 비밀번호일 경우 페이지 이동을 막음
          }
          return true;
        } else {
          openModal(msg, false);
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

  const openModal = (msg, isInitial = false) => {
    setModalMessage(msg);
    setIsModalOpen(true);
    setIsInitialPassword(isInitial); // 초기 비밀번호 여부 설정
  }

  const closeModal = () => {
    setIsModalOpen(false);
    if (isInitialPassword) {
      navigator('/NewSFA'); // 초기 비밀번호일 경우 비밀번호 설정 페이지로 이동
    }
  }

  return (
    <LayoutBase>
      <LayoutSFA style={{backgroundColor: 'var(--logo-blue-color)'}}>
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
        {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
      </LayoutSFA>
    </LayoutBase>
  );
}

export default SFAChild;
