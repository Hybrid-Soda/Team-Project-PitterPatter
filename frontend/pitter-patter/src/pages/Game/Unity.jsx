import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = ({ onGameEnd, isLoading, setIsLoading, score, setScore, backgroundNum }) => {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [landmarks, setLandmarks] = useState("");

  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload } = useUnityContext({
    loaderUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.loader.js",
    dataUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.data.unityweb",
    frameworkUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.framework.js.unityweb",
    codeUrl: "https://ssafy-common.b-cdn.net/Build/pitter-patter.wasm.unityweb",
  });

  const handleGameEnd = useCallback((score, isGameEnd, isLoading) => {
    setIsLoading(isLoading);
    setIsGameEnd(isGameEnd);
    setScore(score); // score 값을 업데이트하여 GamePage에 전달
  }, [setIsLoading, setScore]);

  const [hasGameEnded, setHasGameEnded] = useState(false);

  useEffect(() => {
    if (isGameEnd && !hasGameEnded) {
      onGameEnd(); // 게임이 끝났을 때 openAttModal 호출
      setHasGameEnded(true);
    } else if (!isGameEnd) {
      setHasGameEnded(false);
    }
  }, [isGameEnd, hasGameEnded, onGameEnd]);

  useEffect(() => {
    addEventListener("UnityToReact", handleGameEnd);
    return () => {
      removeEventListener("UnityToReact", handleGameEnd);
    };
  }, [addEventListener, removeEventListener, handleGameEnd]);

  useEffect(() => {
    if (backgroundNum) {
      sendMessage('@Managers', 'ReactToUnity', backgroundNum);
    }
    if (landmarks) {
      sendMessage('@Managers', 'ReactToUnity', landmarks);
    }
  }, [sendMessage, landmarks, backgroundNum]);

  useEffect(() => {
    setIsLoading(true);
    return () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

  useEffect(() => {
    return () => {
      if (typeof unload === "function") {
        unload();
      } else {
        console.error("unload 함수가 존재하지 않습니다.");
      }
    };
  }, [unload]);

  const UpdateLandmark = (newLandmarks) => {
    setLandmarks(newLandmarks);
  };

  return (
    <div style={{ display: isLoading ? "none" : "block" }}>
      <Unity
        unityProvider={unityProvider}
        style={{ height: '80vh', width: 'auto', aspectRatio: '16/9', margin: '0 auto' }}
      />
      <MotionCapture onLandmarksUpdate={UpdateLandmark} />
    </div>
  );
};

export default UnityComponent;
