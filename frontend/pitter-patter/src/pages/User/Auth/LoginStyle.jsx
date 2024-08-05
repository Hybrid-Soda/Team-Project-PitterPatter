import styled from 'styled-components';

export const LayoutBase = styled.div`
  background-color: var(--box-yellow-color);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LayoutLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 25vw;
  border-radius: 40px;
  background-color: var(--background);
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
`;

export const MainText = styled.h1`
  font-size: 2vw;
  font-weight: bold;
  margin: 1vw 0;
  color: var(--logo-yellow-color);
  font-family: 'TTLaundryGothicB';
`;

export const ButtonLogin = styled.button`
  width: 15vw;
  height: 2.5vw;
  margin-top: 1vh;
  border-radius: 6px;
  border: none;
  background-color: #5a5a5a;
  color: var(--background);
  font-size: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ForgotPassword = styled.a`
  font-size: 0.8vw;
  color: #b3b3b3;
  /* margin-bottom: 3vw; */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SignUp = styled.span`
  font-size: 0.8vw;
  color: #b3b3b3;
  margin-top: 0.5vw;
  font-weight: 400;

  a {
    font-weight: 700;
    display: inline;
  }

  &:hover {
    text-decoration: underline;
  }
`;
