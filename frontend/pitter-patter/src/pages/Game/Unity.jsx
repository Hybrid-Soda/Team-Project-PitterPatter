import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = ({ onGameEnd }) => {
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [landmarks, setLandmarks] = useState("")
  const [score, setScore] = useState()
  const backgroundNum = 3

  // Provide Unity
  const { unityProvider, sendMessage, addEventListener, removeEventListener, unload } = useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data.unityweb",
      frameworkUrl: "Build/Build.framework.js.unityweb",
      codeUrl: "Build/Build.wasm.unityweb",
  });

  const handleGameEnd = useCallback((score, isGameEnd) => {
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

  // 컴포넌트 Unmount 시 유니티 종료
  useEffect(() => {
    return () => {
      unload()
    }
  }, [unload])

  // Update landmarks
  const UpdateLandmark = (newLandmarks) => {
    setLandmarks(newLandmarks);
  };

  const unityContainerStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={unityContainerStyle}>
      <Unity 
        unityProvider={unityProvider} 
        style={{ width: '80%', height: '95%' }} 
      />

      {/* <p>{`You've scored ${score} points.`}</p>
      <p>{`isGameEnd = ${isGameEnd}`}</p> */}
      <MotionCapture onLandmarksUpdate={UpdateLandmark} />
    </div>
  );
};

export default UnityComponent;
