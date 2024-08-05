import { useState, useEffect } from 'react';
import axios from 'axios';
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
import { useNavigate, Link } from 'react-router-dom';
import ForgotPWmodal from './ForgotPWmodal';


function SFA() {
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleKeyPress = (value) => {
    if (password.length < 4) {
      setPassword(password + value);
    }
  };

  const handleBackspace = () => {
    setPassword(password.slice(0, -1));
  };

  useEffect(() => {
    if (password.length === 4) {
      setTimeout(() => {
        alert(`입력된 암호: ${password}`);
        setPassword("");
        navigate("/mypage");
      }, 100);
    }
  }, [password]);

  const goBack = () => {
    navigate(-1); // 뒤로가기 기능
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
          <button onClick={() => setModalOpen(true)}>비밀번호를 잊으셨나요?</button>
        </ForgotPassword>
        {modalOpen && <ForgotPWmodal onClose={() => setModalOpen(false)} />}
      </LayoutSFA>
    </LayoutBase>
  );
}

export default SFA;
