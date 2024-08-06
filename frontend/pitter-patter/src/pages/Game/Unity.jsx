import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = () => {
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
      sendMessage('GameManager', 'ReceiveStaticData', backgroundNum);
    }
    if (landmarks) {
      sendMessage('GameManager', 'ReceiveData', landmarks);
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
        style={{ width: '80%', height: '80%' }} 
      />
      <MotionCapture onLandmarksUpdate={UpdateLandmark} />
    </div>
  );
};

export default UnityComponent;
