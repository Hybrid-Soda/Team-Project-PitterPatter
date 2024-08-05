import styled from "styled-components";
import PlaidBackground from "../../assets/img/Background/Plaid.png";

export const MainWrap = styled.div`
  background-image: url(${PlaidBackground});
  background-size: 40%;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: flex-end;
`;

export const MyGame = styled.div`
  width: 65vw;
  height: 75vh;
  margin-top: 5vh;
  background-color: lightgrey;
  margin-bottom: 8vh;
`;

export const OpponentGame = styled.div`
  width: 25vw;
  height: 50vh;
  margin-top: 5vh;
  margin-left: 3vw;
  margin-bottom: 8vh;
  background-color: lightgrey;
`;
