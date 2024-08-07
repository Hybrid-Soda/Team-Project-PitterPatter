import { useState, useRef } from 'react';
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
import naver from "../../../assets/img/logo/naver.png";

import { signUp, checkDuplicateEmail, kakaoLogin } from "/src/pages/User/userApi.js";

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
  const navigator = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const isPasswordValid = () => {
    if (password === passwordCheck) {
      return "";
    } else {
      return "비밀번호 확인이 일치하지 않습니다.";
    }
  };

  const checkEmailValid = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsDuplicated(true);
    } else {
      setIsDuplicated(false);
    }
  }

  const isEmailDuplicate = async () => {
    if (isDuplicated) {
      emailInputRef.current.focus(); // 이메일 형식이 올바르지 않을 때 포커스를 이메일 입력 필드로 설정
      return;
    }

    try {
      const response = await checkDuplicateEmail(email);
      if (response.status === 200) {
        const exception = response.data.exception;
        const msg = response.data.msg;
        setIsValidated(false);

        if (exception === undefined || exception === null) {
          setIsValidated(true);
        }

        alert(msg);
      } else {
        alert('이메일 중복 확인에 실패했습니다.');
      }
    } catch (error) {
      setIsValidated(false);
      alert('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
      handleError(error);
    }
  };

  const handleSignUp = async () => {
    // 이메일 필수 입력
    if (email === "" || email === undefined) {
      alert("이메일을 입력해주세요.");
      emailInputRef.current.focus();
      return;
    }

    // 비밀번호 필수 입력
    if (password === "" || password === undefined) {
      alert("비밀번호를 입력해주세요.");
      passwordInputRef.current.focus();
      return;
    }

    if (isDuplicated) {
      emailInputRef.current.focus(); // 이메일 형식이 올바르지 않을 때 포커스를 이메일 입력 필드로 설정
      return;
    }

    if (!isValidated) {
      alert('이메일 중복 확인을 해주세요.');
      return;
    }

    if (isPasswordValid() !== "") {
      alert('비밀번호 확인이 일치하지 않습니다.');
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
        alert('회원가입이 완료되었습니다.');
        navigator('/login');
      } else if (response.status === 200) {
        alert(msg);
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
      handleError(error);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setIsValidated(false);
    checkEmailValid();
  }

  // test 중.
  const test = async () => {
    window.location.href = "https://pitter-patter.picel.net/oauth2/authorization/kakao";
    // try {
    //   const response = await kakaoLogin();
    //   const msg = response.data.msg;

    //   if (response.status === 200) {
    //     alert(msg);
    //   } else {
    //     alert("카카오 로그인에 실패했습니다.");
    //   }
    // } catch (error) {
    //   alert('네트워크 오류가 발생했습니다. 다시 시도해 주세요.');
    //   handleError(error);
    // }
  }

  const handleError = (error) => {
    // 오류 처리
    if (error.response) {
     // 서버가 응답을 반환했지만 상태 코드가 2xx 범위가 아님
     console.error('Error Response Status:', error.response.status);
     console.error('Error Response Data:', error.response.data);
     console.error('Error Response Headers:', error.response.headers);
   } else if (error.request) {
     // 요청은 성공적으로 전송되었지만 응답을 받지 못함
     console.error('Error Request:', error.request);
   } else {
     // 요청 설정에서 발생한 오류
     console.error('Error Message:', error.message);
   }
 }

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
            id="email"
            placeholder="이메일"
            onChange={handleEmail}
            ref={emailInputRef}
          />
          {isDuplicated &&  <ValidationText isvalid={isDuplicated ? true : undefined}>
            {isDuplicated ? '이메일 형식이 올바르지 않습니다.' : ''}
          </ValidationText>}
          <ButtonCheckId id="button-check-id" onClick={isEmailDuplicate}>
            중복 확인
          </ButtonCheckId>
          <InputText
            type="password"
            id="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordInputRef}
          />
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
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CenterText>또는</CenterText>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <SocialIcon src={kakao} alt="kakao" onClick={test}/>
            <SocialIcon src={naver} alt="naver" />
          </div>
        </div>
      </LayoutSignup>
    </LayoutBase>
  );
}

export default SignUp;