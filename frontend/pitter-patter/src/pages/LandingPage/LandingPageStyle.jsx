import styled from "styled-components";
import LandingBackground from "/src/assets/img/Background/Landing.png";

export const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(${LandingBackground});
  background-size: 100vw; 
  background-position: center;
  background-repeat: no-repeat;
`;

export const HeaderBody = styled.div`
  width: 100vw;
  height: 10vh;
  /* background-color: rebeccapurple; */
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 998;
`;

export const LayoutHeader = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

export const LogoImg = styled.img`
  height: 80%;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

export const LayoutHeaderButton = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderButton = styled.img`
  width: 50%;
  height: 50%;
  margin: 0 20%;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(${LandingBackground});
  background-size: 100vw;
  background-position: center;
  background-repeat: no-repeat;
`;

export const SubTitle = styled.div`
  font-size: 1vw;
  font-family: "NEXON Lv1 Gothic OTF";
`;

export const Title = styled.div`
  font-size: 2vw;
  margin: 1vw;
  font-family: "TTLaundryGothicB";
`;

export const MainImage = styled.img`
  height: 45vh;
`;

export const Button = styled.button`
  background-color: var(--box-yellow-color);
  color: black;
  border: none;
  border-radius: 2vw;
  padding: 1vw 4vw;
  margin-bottom: 2vw;
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
  box-shadow: 0 5px 0 0vw var(--logo-yellow-color);
  font-size: 1.2vw;
  font-weight: bold;
`;

export const TextButton = styled.div`
  font-size: 1em;
  text-decoration: underline;
  color: var(--font-color);
  cursor: url(/src/assets/cursor/pointer.png), pointer !important;
`;
