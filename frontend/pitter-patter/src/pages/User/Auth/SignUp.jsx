import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LayoutBase,
  LayoutSignup,
  MainText,
  ButtonCheckId,
  ButtonSignup,
  LoginText,
  ValidationText,
} from './SignUpStyle';
import { Link } from 'react-router-dom';
import X from "../../../assets/img/logo/X.png";
import kakao from "../../../assets/img/logo/kakao.png";
import Modal from '../../Components/modal';
import PointerImg from "/src/assets/cursor/pointer.png";

import { signUp, checkDuplicateEmail } from "/src/pages/User/userApi.js";

const IconX = styled.img`
  width: 1.5vw;
  cursor: url(${PointerImg}), pointer !important;
`;

const InputText = styled.input`
  padding: 1vw;
  margin: .5vw 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1vw;
  width: 13vw;
`;

const CenterText = styled.span`
  font-size: 1vw;
  color: #757575;
  margin: 1.5vw 0;
`;

const SocialIcon = styled.img`
  width: 3vw;
  cursor: url(${PointerImg}), pointer !important;
`;

const Popover = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 14vw;
  word-break : keep-all;
`;

function SignUp() {
  const navigator = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // 팝오버 상태 추가
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    setIsValidated(isEmailValid(email) || email === '');
  }, [email]);

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = () => {
    if (password === passwordCheck) {
      return "";
    } else {
      return "비밀번호 확인이 일치하지 않습니다.";
    }
  };

  const isEmailDuplicate = async () => {
    if (email === "" || email === undefined) {
      setModalMessage("이메일을 입력해주세요.");
      setIsModalOpen(true);
      return;
    }

    if (!isValidated) {
      emailInputRef.current.focus();
      return;
    }

    try {
      const response = await checkDuplicateEmail(email);
      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.msg;
        setIsDuplicated(true);

        if (exception === undefined) {
          setIsDuplicated(false);
        }
        openModal(msg);
      } else {
        setIsDuplicated(true);
        openModal("이메일 중복 확인에 실패했습니다.");
      }
    } catch (error) {
      setIsDuplicated(true);
      openModal("문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSignUp = async () => {
    if (email === "" || email === undefined) {
      openModal("이메일을 입력해주세요.");
      return;
    }

    if (password === "" || password === undefined) {
      openModal("비밀번호를 입력해주세요.");
      return;
    }

    if (!isValidated) {
      emailInputRef.current.focus();
      return;
    }

    if (isDuplicated) {
      openModal("이메일 중복 확인을 해주세요.");
      return;
    }

    if (isPasswordValid() !== "") {
      openModal("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const response = await signUp(data);
      const msg = response.data.msg;
      if (response.status === 201) {
        openModal("회원가입이 완료되었습니다.");
      } else if (response.status === 200) {
        openModal(msg);
      } else {
        openModal("회원가입에 실패했습니다.");
      }
    } catch (error) {
      openModal("문제가 발생했습니다. 다시 시도해주세요.");
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsDuplicated(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "회원가입이 완료되었습니다.") {
      navigator('/login');
    } else if (modalMessage === "이메일을 입력해주세요.") {
      emailInputRef.current.focus();
    } else if (modalMessage === "비밀번호를 입력해주세요.") {
      passwordInputRef.current.focus();
    }
  }

  const openModal = (msg) => {
    setModalMessage(msg);
    setIsModalOpen(true);
  }

  const handlePasswordFocus = () => {
    setIsPopoverOpen(true); // 포커스 시 팝오버 열기
  };

  const handlePasswordBlur = () => {
    setIsPopoverOpen(false); // 포커스 해제 시 팝오버 닫기
  };

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0vw', position: 'relative' }}>
          <InputText
            type="text"
            id="email"
            placeholder="이메일"
            onChange={handleEmail}
            ref={emailInputRef}
          />
          {!isValidated &&  <ValidationText isvalid={true}>
            이메일 형식이 올바르지 않습니다.
          </ValidationText>}
          <ButtonCheckId id="button-check-id" onClick={isEmailDuplicate}>
            중복 확인
          </ButtonCheckId>
          <div style={{ position: 'relative' }}>
            <InputText
              type="password"
              id="password"
              placeholder="비밀번호"
              onFocus={handlePasswordFocus} // 포커스 시 팝오버 열기
              onBlur={handlePasswordBlur} // 포커스 해제 시 팝오버 닫기
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordInputRef}
            />
            {isPopoverOpen && (
              <Popover>
                비밀번호는 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.
              </Popover>
            )}
          </div>
          <InputText
            type="password"
            id="password-check"
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <ValidationText isvalid={isPasswordValid() ? true : undefined}>
            {isPasswordValid()}
          </ValidationText>
          <ButtonSignup id="button-signup" onClick={handleSignUp}>
            회원 가입
          </ButtonSignup>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <LoginText>
              이미 계정이 있으신가요? <a href="/login">로그인</a>
            </LoginText>
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CenterText>또는</CenterText>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <SocialIcon src={kakao} alt="kakao" />
          </div> */}
        </div>

        {isModalOpen && (
          <Modal title="알림" onClose={closeModal}>
            {modalMessage}
          </Modal>
        )}
      </LayoutSignup>
    </LayoutBase>
  );
}

export default SignUp;
