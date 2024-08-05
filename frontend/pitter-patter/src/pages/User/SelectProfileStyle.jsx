import styled from 'styled-components';

export const LayoutBase = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LayoutProfileWrap = styled.div`
  height: 80vh;
  width: 70vw;
  border-radius: 30px;
  border: var(--box-yellow-color) 10px solid;
  box-sizing: border-box;
  background-color: var(--background);
  box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.h1`
  font-size: 1.8vw;
  font-weight: 700;
  font-family: 'TTLaundryGothicB';
`;

export const ProfileList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 5vw;
  width: 60vw;
  height: 30vh;
  overflow-y: auto;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.div`
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vw;

  &.profile-add {
    background-color: lightgrey;
  }
  
  &:hover {
    box-shadow: 0px 11px 39.6px 0px rgba(0, 0, 0, 0.25);
    cursor: url(/src/assets/cursor/pointer.png), pointer !important;
  }
`;

export const IconPlus = styled.img`
  width: 4vw;
  height: 4vw;
`;

export const UserId = styled.span`
  font-size: 1.2vw;
`;
