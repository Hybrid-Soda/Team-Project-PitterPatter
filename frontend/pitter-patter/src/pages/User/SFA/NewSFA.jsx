import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Modal from './Modal'; // 모달 컴포넌트를 import 합니다

function NewSFA() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFirstInput, setIsFirstInput] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleKeyPress = (value) => {
    if (isFirstInput) {
      if (password.length < 4) {
        setPassword(password + value);
      }
    } else {
      if (confirmPassword.length < 4) {
        setConfirmPassword(confirmPassword + value);
      }
    }
  };

  const handleBackspace = () => {
    if (isFirstInput) {
      setPassword(password.slice(0, -1));
    } else {
      setConfirmPassword(confirmPassword.slice(0, -1));
    }
  };

  useEffect(() => {
    if (isFirstInput && password.length === 4) {
      setTimeout(() => {
        setIsFirstInput(false);
      }, 100);
    } else if (!isFirstInput && confirmPassword.length === 4) {
      setTimeout(() => {
        if (password === confirmPassword) {
          setModalMessage("새 비밀번호가 설정되었습니다.");
          setModalOpen(true);
          // setTimeout(() => {
          //   setPassword("");
          //   setConfirmPassword("");
          //   navigate("/mypage");
          // }, 2000); // 모달창을 띄운 후 2초 뒤에 페이지를 이동하거나 비밀번호를 초기화합니다.
        } else {
          setModalMessage("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
          setModalOpen(true);
          // setTimeout(() => {
          //   setPassword("");
          //   setConfirmPassword("");
          //   setIsFirstInput(true);
          // }, 2000); // 모달창을 띄운 후 2초 뒤에 비밀번호를 초기화합니다.
        }
      }, 100);
    }
  }, [password, confirmPassword, isFirstInput, navigate]);

  const closeModal = () => {
    setModalOpen(false);
    if (modalMessage === "새 비밀번호가 설정되었습니다.") {
      navigate("/mypage");
    } else {
      setPassword("");
      setConfirmPassword("");
      setIsFirstInput(true);
    }
  };

  const goBack = () => {
    navigate(-1); // 뒤로가기 기능
  };

  return (
    <LayoutBase>
      <LayoutSFA>
        <div style={{ height: "10vh", display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <button onClick={goBack}><IconX src={ArrowLeft} alt="ArrowLeft" /></button>
        </div>
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {isFirstInput ? '새 2차 비밀번호를 입력해주세요.' : '한번 더 입력해주세요.'}
        </span>
        <DotWrap>
          {[...Array(4)].map((_, i) => (
            <PasswordDot key={i} className={i < (isFirstInput ? password.length : confirmPassword.length) ? 'filled' : ''}></PasswordDot>
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
      </LayoutSFA>
      {modalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </LayoutBase>
  );
}

export default NewSFA;
