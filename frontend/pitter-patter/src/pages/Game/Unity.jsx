import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = () => {
  const [landmarks, setLandmarks] = useState("")
  const [score, setScore] = useState()
  const backgroundNum = 3

  // Provide Unity
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityContext({
      loaderUrl: "Build/BuildGZ.loader.js",
      dataUrl: "Build/BuildGZ.data.unityweb",
      frameworkUrl: "Build/BuildGZ.framework.js.unityweb",
      codeUrl: "Build/BuildGZ.wasm.unityweb",
  });

  // Unity -> React
  useEffect(() => {
    addEventListener("UnityToReact", setScore);
    return () => {
      removeEventListener("UnityToReact", setScore);
    };
  }, [addEventListener, removeEventListener, setScore]);

  // React -> Unity
  useEffect(() => {
    if (backgroundNum) {
      sendMessage('GameManager', 'ReceiveStaticData', backgroundNum);
    }
    if (landmarks) {
      sendMessage('GameManager', 'ReceiveData', landmarks);
    }
  }, [sendMessage, landmarks, backgroundNum]);

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

      <p>{`You've scored ${score} points.`}</p>
      <MotionCapture onLandmarksUpdate={UpdateLandmark} />
    </div>
  );
};

export default UnityComponent;
