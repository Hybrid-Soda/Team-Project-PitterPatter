import styled from "styled-components";
import PlaidBackground from "../../assets/img/Background/Plaid.png";

export const MainWrap = styled.div`
  background-image: url(${PlaidBackground});
  background-size: 40%;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Loader = styled.div`
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
`;

export const Unity = styled.div`
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.isLoading ? 'none' : 'block')};
`;
