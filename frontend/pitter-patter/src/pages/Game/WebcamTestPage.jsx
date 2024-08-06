import React, { useEffect, useState, useRef } from "react"
import {WebcamTest, DeviceSelect, VideoContainer, VideoPreview, CompleteButton } from "./WebcamTestPageStyle"

const WebcamTestPage = ({ onTestComplete }) => {
  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState("")
  const videoRef = useRef(null)

  // 컴포넌트가 마운트될 때 웹캠 장치를 가져옴
  useEffect(() => {
    const getWebcams = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(device => device.kind === "videoinput")
      setDevices(videoDevices)
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId)
      }
    }
    getWebcams()
  }, [])

  // 선택된 장치 ID가 변경될 때 웹캠 스트림 시작
  useEffect(() => {
    let stream
    const startWebcam = async () => {
      if (selectedDeviceId && videoRef.current) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId }
        })
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    }

    startWebcam()

    // 컴포넌트 언마운트 시 비디오 트랙 정지
    return () => {
      console.log(videoRef)
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      if (videoRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.srcObject = null;
      }
    }
  }, [selectedDeviceId])

  // 장치 변경 처리 핸들러
  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value)
  }

  return (
    <WebcamTest>
      {/* 웹캠 장치를 선택하는 드롭다운 메뉴 */}
      <DeviceSelect onChange={handleDeviceChange} value={selectedDeviceId}>
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
  )
}

export default WebcamTestPage
