import React, { useEffect } from "react"
import { Unity, useUnityContext } from "react-unity-webgl"

const GamePage = () => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Build/Build.loader.js",
    dataUrl: "Build/Build.data",
    frameworkUrl: "Build/Build.framework.js",
    codeUrl: "Build/Build.wasm",
  })

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onmessage = (event) => {
      const data = event.data;
      // Unity에 메시지 전달
      sendMessage('GameManager', 'ReceiveData', data);
    };

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [sendMessage]);


  const unityContainerStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={unityContainerStyle}>
      <Unity 
        unityProvider={unityProvider} 
        style={{ width: '80%', height: '80%' }} // Unity 화면 크기 설정
      />
    </div>
  )
}

export default GamePage