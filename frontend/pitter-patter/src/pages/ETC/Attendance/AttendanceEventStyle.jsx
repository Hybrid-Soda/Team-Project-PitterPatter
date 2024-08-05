import styled from "styled-components";

export const Board = styled.div`
  position: relative;
  width: 48vw;
  height: 73vh;
  border: none;
  border-radius: 40px;
  padding: 1vw;
  background-color: #fff;
`;

export const Stone = styled.img`
  position: absolute;
  width: 5vw;
  height: 5vw;
`;

export const SVGContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 95%;
  pointer-events: none;
`;
