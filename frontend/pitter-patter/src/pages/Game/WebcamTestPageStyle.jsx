import styled from "styled-components";

export const WebcamTest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* max-width: 600px; */
  width: 45vw;
  /* height: 80vh; */
  margin: 0 auto;
`;

export const DeviceSelect = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 0;
  padding-bottom: 75%; /* 4:3 Aspect Ratio */
  background-color: #000;
  border-radius: 10px;
  overflow: hidden;
`;

export const VideoPreview = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CompleteButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: var(--font-color);
  background-color: var(--logo-yellow-color);
  border: none;
  border-radius: 5px;
  /* cursor: pointer; */
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--logo-yellow-color);
  }
`;
