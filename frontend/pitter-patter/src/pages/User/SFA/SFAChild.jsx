import { useState, useEffect } from 'react';
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

import { verify2fa } from "/src/pages/User/userApi.js";

function SFAChild() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // 추후 redux에서 가져와야 할 정보
  const [accessToken, setAccessToken] = useState('access token');

  useEffect(() => {
    const verifyPassword = async () => {
      if (password.length === 4) {
        const isVerified = await isVerifiedSFA();
        setPassword('');
        if (isVerified) {
          navigate('/child');
        }
      }
    };

    verifyPassword();
  }, [password]);

  const goBack = () => {
    navigate(-1); // 뒤로가기 기능
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
          return true;
        } else {
          alert(msg);
          return false;
        }
      } else {
        alert("예기치 못한 오류로 2차 비밀번호를 검증하는데 실패했습니다.");
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // intercetor에서 토큰 재발급 수행
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigator("/");
      } else if (error.msg && error.msg === "토큰 검증 실패") {
        // intercetor에서 토큰 재발급 수행
        alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");
        navigator("/");
      } else {
        alert("문제가 발생했습니다. 다시 시도해주세요.");
        return false;
      }
    }
  };

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
          <button onClick={() => setModalOpen(true)}>비밀번호를 잊으셨나요?</button>
        </ForgotPassword>
        {modalOpen && <ForgotSFAmodal onClose={() => setModalOpen(false)} />}
      </LayoutSFA>
    </LayoutBase>
  );
}

export default SFAChild;
