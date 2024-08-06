import styled from 'styled-components';

export const LayoutBase = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
`;

export const LayoutSignup = styled.div`
  background-color: var(--box-yellow-color);
  // height: 78vh;
  width: 30vw;
  padding: 4vh 0;
  border-radius: 40px;
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainText = styled.h1`
  font-size: 2vw;
  font-weight: bold;
  /* margin-top: 1vw; */
  color: #616161;
  font-family: 'TTLaundryGothicB';
`;

export const ButtonCheckId = styled.button`
  width: 15vw;
  height: 2.5vw;
  margin-top: 0.5vw;
  margin-bottom: 2vw;
  border-radius: 6px;
  border: none;
  background-color: #fffdec;
  color: #757575;
  font-size: 1vw;
  font-weight: bold;
`;

export const ButtonSignup = styled.button`
  width: 15vw;
  height: 2.5vw;
  margin-top: 0.5vw;
  margin-bottom: 0.5vw;
  border-radius: 6px;
  border: none;
  background-color: #5a5a5a;
  color: var(--background);
  font-size: 1vw;
  font-weight: bold;
`;

export const LoginText = styled.span`
  font-size: 1vw;
  color: var(--font-color);
  margin: 0.5vw 0;
  opacity: .6;

  a {
    display: inline;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
  }
`;

export const ValidationText = styled.div`
  font-size: 1vw;
  font-weight: bold;
  height: 1vw;
  color: ${props => props.isvalid ? 'var(--text-orange-color)' : '#ff0000'};
  margin: 0.5vw 0;
`;