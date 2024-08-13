import styled from "styled-components";
import PlaidBackground from "../../assets/img/Background/Plaid.png";

export const MainWrap = styled.div`
  background-image: url(${PlaidBackground});
  background-size: 40%;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export const MyGame = styled.div`
  width: 65vw;
  height: 75vh;
  margin-top: 5vh;
  background-color: lightgrey;
  margin-bottom: 8vh;
`;

export const GraphWrap = styled.div`
  width: 25vw;
  height: 75vh;
  margin-top: 5vh;
  margin-bottom: 8vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const BarWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  height: 80%;
  width: 100%;
`;

export const Bar = styled.div`
  background-color: ${(props) => (props.me ? "#FFE65C" : "#ccc")};
  width: 20%;
  margin: 0 15%;
  height: ${(props) => props.height}%;
  border-radius: 2.5rem 2.5rem 0 0;
  transition: height 0.5s;
`;

export const NameWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 10%;
  width: 100%;
`;

export const Name = styled.div`
  font-size: 1.5rem;
  width: 30%;
  margin: 0 10%;
  text-align: center;
  background-color: ${(props) => (props.me ? "#fff6ca" : "#e5e5e5")};
  padding: 0.5rem;
`;