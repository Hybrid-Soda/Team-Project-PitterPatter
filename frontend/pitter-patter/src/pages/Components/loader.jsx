import React from 'react';
import styled, { keyframes } from 'styled-components';

// keyframes 정의
const loading04 = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
`;

// 애니메이션을 적용한 Span 컴포넌트
const LoadingSpan = styled.span`
  display: inline-block;
  font-size: 5vw;
  margin: 0 -0.05em;
  animation: ${loading04} 0.7s infinite;
  font-family: 'LOTTERIACHAB';
  text-shadow: -3px 0 white, 0 3px white, 3px 0 white, 0 -3px white;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
  &:nth-child(5) {
    animation-delay: 0.4s;
  }
  &:nth-child(6) {
    animation-delay: 0.5s;
  }
`;

// Loader가 세로로 가운데에 오도록 설정
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  // 화면 전체 높이 사용
  text-align: center;
`;

// TIP 스타일 정의
const TipText = styled.p`
  margin-top: 40px;
  padding: 0 20px;
  font-size: 1.2vw;
  color: #555; // 일반 텍스트 색상
  &::before {
    content: "TIP: ";
    color: var(--logo-pink-color); // TIP 텍스트 색상
  }
`;

const Loader = () => {
  return (
    <LoadingContainer>
      <div>
        <LoadingSpan style={{color: 'var(--logo-pink-color)'}}>L</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-pink-color)'}}>O</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-yellow-color)'}}>A</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-yellow-color)'}}>D</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-green-color)'}}>I</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-green-color)'}}>N</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-blue-color)'}}>G</LoadingSpan>
        <LoadingSpan style={{color: 'var(--logo-blue-color)'}}>...</LoadingSpan>
        <TipText>
          게임이 느리면 크롬의 설정-시스템-그래픽 가속을 켜보세요.
        </TipText>
        <TipText>
          모션인식이 작동하지 않는다면, 주소창에 <strong>chrome://flags</strong>를 입력한 후 "모두 재설정"을 클릭하여 설정을 초기화해보세요.
        </TipText>
      </div>
    </LoadingContainer>
  );
};

export default Loader;
