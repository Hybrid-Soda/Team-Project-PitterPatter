import React, { useState, useCallback, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = () => {
  const [landmarks, setLandmarks] = useState("");
  const [score, setScore] = useState()
  const backgroundNum = 3

  const { unityProvider, sendMessage } = useUnityContext({
      loaderUrl: "Build/BuildGZ.loader.js",
      dataUrl: "Build/BuildGZ.data.unityweb",
      frameworkUrl: "Build/BuildGZ.framework.js.unityweb",
      codeUrl: "Build/BuildGZ.wasm.unityweb",
  });

  const handleGameEnd = useCallback((score) => {
    setScore(score);
  }, []);

  useEffect(() => {
    addEventListener("UnityToReact", handleGameEnd);
    return () => {
      removeEventListener("UnityToReact", handleGameEnd);
    };
  }, [handleGameEnd]);

  useEffect(() => {
    if (backgroundNum) {
      sendMessage('GameManager', 'ReceiveStaticData', backgroundNum);
    }
    if (landmarks) {
      sendMessage('GameManager', 'ReceiveData', landmarks);
    }
  }, [sendMessage, landmarks, backgroundNum]);

  const handleLandmarksUpdate = (newLandmarks) => {
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

      <p>{`You've scored ${score} points.`}</p>
      <MotionCapture onLandmarksUpdate={handleLandmarksUpdate} />
    </div>
  );
};

export default UnityComponent;
