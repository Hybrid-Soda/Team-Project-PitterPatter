import React, { useEffect, useState, useRef } from "react"
import {WebcamTest, DeviceSelect, VideoContainer, VideoPreview, CompleteButton } from "./WebcamTestPageStyle"

const WebcamTestPage = ({ onTestComplete }) => {
  const [devices, setDevices] = useState([])
  const [nowDeviceId, setNowDeviceId] = useState("")
  const videoRef = useRef(null)

  // 컴포넌트가 마운트될 때 웹캠 장치를 가져옴
  useEffect(() => {
    const getWebcams = async () => {
      // 사용 가능한 미디어 입력 및 출력 장치 목록 요청
      const devices = await navigator.mediaDevices.enumerateDevices()
      // 비디오 디바이스 필터링
      const videoDevices = devices.filter(device => device.kind === "videoinput")
      setDevices(videoDevices)
      if (videoDevices.length > 0) {
        setNowDeviceId(videoDevices[0].deviceId)
      }
    }
    getWebcams()
  }, [])

  // 선택된 장치 ID가 변경될 때 웹캠 스트림 시작
  useEffect(() => {
    let stream = null
    const constraints = {
      video: { deviceId: nowDeviceId }
    }

    const startWebcam = async () => {
      stream = await navigator.mediaDevices.getUserMedia(constraints)
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }

    startWebcam()

    // 컴포넌트 언마운트 시 비디오 트랙 정지
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [nowDeviceId])

  // 장치 변경 처리 핸들러
  const handleDeviceChange = (event) => {
    setNowDeviceId(event.target.value)
  }

  return (
    <div style={{width: '100vw', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0}}>
      <WebcamTest>
        {/* 웹캠 장치를 선택하는 드롭다운 메뉴 */}
        <DeviceSelect onChange={handleDeviceChange} value={nowDeviceId}>
          {devices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </option>
          ))}
        </DeviceSelect>
        {/* 비디오 미리보기를 위한 컨테이너 */}
        <VideoContainer>
          <VideoPreview ref={videoRef} />
        </VideoContainer>
        {/* 테스트 완료 버튼 */}
        <CompleteButton onClick={onTestComplete}>완료</CompleteButton>
      </WebcamTest>
    </div>
  )
}

export default WebcamTestPage
