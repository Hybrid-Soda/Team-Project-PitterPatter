import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import MotionCapture from "./MotionCapture";

const UnityComponent = () => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  });

  const [landmarks, setLandmarks] = useState("");

  useEffect(() => {
    if (landmarks) {
      sendMessage('GameManager', 'ReceiveData', landmarks);
    }
  }, [landmarks, sendMessage]);

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
      <MotionCapture onLandmarksUpdate={handleLandmarksUpdate} />
    </div>
  );
};

export default UnityComponent;
