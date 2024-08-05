import React from 'react';
import styled from "styled-components";
import Header from "./LandingPage/Header";
import ErrorImgSrc from "/src/assets/img/Error/error.png";
import '/src/style/main.css';

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
  margin-top: 10vh;
  position: relative;
`;

const Ellipse = styled.div`
  width: 35vw;
  height: 23vw; 
  background: rgba(255, 193, 57, 0.30);
  border-radius: 552px; /* 타원형 도형을 둥글게 만듦 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 타원형 도형을 가운데 정렬 */
  z-index: -1; /* 이미지 뒤에 배치 */
  filter: blur(25.55px); /* 블러 효과 */
  opacity: var(--sds-size-stroke-border); /* 투명도설정 */
`;

const ErrorImg = styled.img`
  width: 30vw;
`;

const ErrorMsg = styled.div`
  color: rgba(97, 97, 97, 0.50);
  text-align: center;
  font-family: "LOTTERIACHAB";
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 12px;
`;

const ErrorTxt = styled.div`
  color: #000;
  text-align: center;
  font-size: 2vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function Error() {
    return (
        <MainWrap>
            <Header />
            <ErrorBox>
                <Ellipse />
                <ErrorMsg>404 NOT FOUND</ErrorMsg>
                <ErrorImg src={ErrorImgSrc} alt="errorImg" />
                <ErrorTxt>주소를 다시 확인해주세요... :(</ErrorTxt>
            </ErrorBox>
        </MainWrap>
    );
}

export default Error;
