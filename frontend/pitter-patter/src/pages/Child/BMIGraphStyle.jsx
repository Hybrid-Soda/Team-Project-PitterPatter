// ChildActivityTableStyle.js
import styled from 'styled-components';

export const LayoutActivityPage = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LayoutGraphList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PlaytimeGraph = styled.div`
  width: 80%;
  height: 300px; /* 적절한 높이 설정 */
`;

export const GraphHeader = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #757575;
    font-size: 1rem;
  }

  a {
    color: #757575;
    font-size: 1rem;
    margin-left: 5px;
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const GraphFooter = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.2em;

  p {
    font-size: 1.15em;
  }
`;

export const ContentBody = styled.div`
  width: 75vw;
  height: 77vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
