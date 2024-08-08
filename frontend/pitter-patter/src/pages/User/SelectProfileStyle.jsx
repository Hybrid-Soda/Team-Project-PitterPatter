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
  margin: 0 1rem;
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
    transition: ease-in-out 0.2s;
  }
`;

export const IconPlus = styled.img`
  width: 4vw;
  height: 4vw;
  object-fit: fill;
`;

export const UserId = styled.span`
  font-size: 1.2vw;
`;

export const LayoutMypage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const MypageButton = styled.button`
  font-size: 1rem;
  color: var(--font-color);
  border: .13rem solid var(--font-color);
  border-radius: 1.4rem;
  padding: .5rem 2rem;
  font-weight: bold;
  /* margin-top: 3%; */
  &:hover {
    background-color: var(--box-yellow-color);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
    transition: ease-in-out .2s;
  }
`