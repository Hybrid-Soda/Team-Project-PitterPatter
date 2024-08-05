import styled from "styled-components";
import PlaidBackground from "../../assets/img/Background/Plaid.png";

export const MainWrap = styled.div`
  background-image: url(${PlaidBackground});
  background-size: 40%;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

export const Game = styled.div`
  width: 90vw;
  height: 75vh;
  margin-top: 5vh;
  background-color: lightgrey;
`;
