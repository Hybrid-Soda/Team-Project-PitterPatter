import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = ({ onGameEnd, isLoading, setIsLoading }) => {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [landmarks, setLandmarks] = useState("")
  const [score, setScore] = useState()
  const backgroundNum = 3

  // Provide Unity
  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload } = useUnityContext({
      loaderUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.loader.js",
      dataUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.data",
      frameworkUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.framework.js",
      codeUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.wasm",
  });

  const handleGameEnd = useCallback((score, isGameEnd, isLoading) => {
    setIsLoading(isLoading);
    setIsGameEnd(isGameEnd);
    setScore(score);
  }, []);

  const [hasGameEnded, setHasGameEnded] = useState(false);

  // 게임 로직 중에 isGameEnd가 true가 되는 시점을 감지하여 호출
  useEffect(() => {
    if (isGameEnd && !hasGameEnded) {
      onGameEnd();
      setHasGameEnded(true); // 한 번 호출되면 상태를 변경하여 다시 호출되지 않도록 함
    } else if (!isGameEnd) {
      setHasGameEnded(false); // isGameEnd가 false로 변경되면 상태를 리셋
    }
  }, [isGameEnd, hasGameEnded, onGameEnd]);

  // Unity -> React
  useEffect(() => {
    addEventListener("UnityToReact", handleGameEnd);
    return () => {
      removeEventListener("UnityToReact", handleGameEnd);
    };
  }, [addEventListener, removeEventListener, handleGameEnd]);

  // React -> Unity
  useEffect(() => {
    if (backgroundNum) {
      sendMessage('@Managers', 'ReactToUnity', backgroundNum);
    }
    if (landmarks) {
      sendMessage('@Managers', 'ReactToUnity', landmarks);
    }
  }, [sendMessage, landmarks, backgroundNum]);

  // 컴포넌트가 마운트될 때 로딩 상태 true, 언마운트될 때 로딩 상태 false
  useEffect(() => {
    setIsLoading(true); // 로딩 시작
    return () => {
      setIsLoading(false); // 로딩 종료
    };
  }, [setIsLoading]);

  // 컴포넌트 Unmount 시 유니티 종료
  useEffect(() => {
    return () => {
      if (typeof unload === "function") {
        unload();
      } else {
        console.error("unload 함수가 존재하지 않습니다.");
      }
    };
  }, [unload]);

  // Update landmarks
  const UpdateLandmark = (newLandmarks) => {
    setLandmarks(newLandmarks);
  };

  return (
    <div>
      <Unity unityProvider={unityProvider} style={{ width: '90vw', height: 'auto' }}/>
      <MotionCapture onLandmarksUpdate={UpdateLandmark} />
      <p>{`You've scored ${score} points.`}</p>
      <p>{`isGameEnd = ${isGameEnd}`}</p>
    </div>
  );
};

export default UnityComponent;
