import styled from 'styled-components';

export const LayoutMyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

export const MainImg = styled.img`
  width: 8vw;
`;

export const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vw;
  gap: 1vw;
  overflow-y: scroll;
  height: 20vh;
`;

export const InputItem = styled.div`
  margin-top: 0.5vw;
  width: 30vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 .5rem;
`;

export const InputTitle = styled.span`
  font-size: 1.2vw;
  color: #616161;
`;

export const Profile = styled.div`
  width: 10vw;
  height: 10vw;
  /* background: radial-gradient(lightpink, white 50%, white); */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
