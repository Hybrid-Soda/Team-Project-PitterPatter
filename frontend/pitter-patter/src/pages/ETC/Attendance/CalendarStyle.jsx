import styled from "styled-components";
import StarIcon from "/src/assets/icons/star.png";

export const CalendarWrapper = styled.div`
  width: 50vw;
  height: 76vh;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 40px;
    padding: 1vw;
    background-color: #fff;
  }

  .react-calendar__month-view {
    padding: 12px 32px;
  }

  .react-calendar__tile {
    text-align: center;
    height: 9vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0;

    &.attendance-day {
      background-image: url(${StarIcon}) !important;
      background-repeat: no-repeat !important;
      background-position: center center !important;
      background-size: contain;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none; /* 클릭 이벤트 방지 */
    }

    &.react-calendar__tile--active {
        background: transparent;
        color: inherit; /* 글자색 변경 방지 */
        outline: none; /* 선택된 테두리 변경 방지 */
    }

    &.react-calendar__tile--now {
      border: 4px dashed rgba(0,0,256, .1); /* 점선 테두리 추가 */
      background-color: white;
    }

    &:hover {
      background-color: inherit; /* 호버 시 반응 제거 */
    }
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 2rem;
  }

  .react-calendar__navigation {
    height: 90px;
    border-radius: 20px 20px 0 0;

    span {
      font-size: 24px;
      font-weight: 600;
      color: #629d1b;
    }
  }
`;

export const DayInfo = styled.div`
  color: #a5a5a5;
  font-size: .8rem;
  display: flex;
  justify-content: flex-end;
  margin-right: 1.5rem;
`;
