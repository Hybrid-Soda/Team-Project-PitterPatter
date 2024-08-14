import styled from 'styled-components';

// Styled Components
export const ContentBody = styled.div`
  width: 75vw;
  height: 77vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PhysicalInfoInput = styled.div`
  width: 100%;
  height: 28%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

export const PhysicalInfoHistory = styled.div`
    width: 100%;
    height: 50%;
    // overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PhysicalInfoHistoryInnerDiv = styled.div`
    width: 68%;
    height: 90%;
    background-color: #9cb5d429;
    display: flex;
    flex-direction: column;
    gap: 1.7em;
    overflow-y: scroll;
    padding: 1.5em 0;

    div {
        padding: 0px 25px;
        display: flex;
        gap: 4em;
        justify-content: space-around;

        span:first-of-type {
            width: 13em;
        }

        span {
            font-size: 0.9em;
        }
    }

    button {
        color: #757575;
    }

    /* 스크롤바 스타일 */
    &::-webkit-scrollbar {
        width: 0; /* 스크롤바의 너비를 0으로 설정하여 보이지 않게 함 */
        height: 0; /* 가로 스크롤바의 높이를 0으로 설정하여 보이지 않게 함 */
    }

    &::-webkit-scrollbar-track {
        background: transparent; /* 트랙의 배경색을 투명으로 설정 */
    }

    &::-webkit-scrollbar-thumb {
        background: transparent; /* 핸들의 배경색을 투명으로 설정 */
    }

    &::-webkit-scrollbar-thumb:hover {
        background: transparent; /* 호버 시 핸들의 배경색을 투명으로 설정 */
    }
`;

export const ImgDiv = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: contain;
        /* background-color: #757575; */
        /* box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.15); */
        border: .1rem solid rgba(0, 0, 0, 0.15);
`;

export const InputDiv = styled.div`
    width: 38%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8em;
`;

export const InputInnerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;


    div {
        display: flex;
        justify-content: center;
        width: 40%;
    }

    label {
        color: #616161;
        font-size: 20px;
    }

    input {
        padding-left: 1rem;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const AddBtnDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
        background-color: #A4E6F3;
        border-radius: 21px;
        width: 55px;
        height: 31px;
        box-shadow: 0px 5px 0px 0px #759FD1; /* 그림자 추가 */
        font-size: 12px;

        &:hover:not(:disabled) {
        transform: translateY(1px);
        }

        &:active:not(:disabled) {
            box-shadow: ${(props) => (props.highlight ? "0 1px 0 0 #759FD1" : "0 1px 0 0 #759FD1")};
            transform: translateY(2px);
        }

        &:disabled {
            color: black;
            background-color: #B3B3B3;
            box-shadow: 0 -3px 1px 0 #757575;
            cursor: auto;
        }
    }
`;