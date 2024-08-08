import React, { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

const MotionCapture = ({ onLandmarksUpdate }) => {
  const videoRef = useRef(null);
  const [poseList, setPoseList] = useState([]);
  const width = 640
  const height = 480
  let camera = null;

  useEffect(() => {
    // Mediapipe Pose 초기화, 옵션, 콜백 함수 설정
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    })
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })
    pose.onResults(onPose);

    // 비디오 요소 참조를 통해 카메라 초기화 및 시작
    const videoElement = videoRef.current;
    if (videoElement) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      camera = new Camera(videoElement, {
        onFrame: async () => {
          await pose.send({ image: videoElement })
        }
      });
      camera.start();
    }

    // 컴포넌트 언마운트 시 비디오 트랙 정지
    return () => {
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop())
      }
      if (camera) {
        camera.stop();
        camera = null;
      }
    }
  }, [])

  // Pose 결과 처리
  const onPose = (results) => {
    if (results.poseLandmarks) {
      // 랜드마크 좌표 변환
      const landmarks = results.poseLandmarks.map((lm) => [(1 - lm.x) * width, (1 - lm.y) * height, (1 - lm.z) * width]);

      setPoseList((prevPoseList) => {
        const newPoseList = [...prevPoseList, landmarks];
        if (newPoseList.length > 5) newPoseList.shift();

        if (newPoseList.length === 5) {
          const avgPos = calAvgPos(newPoseList)
          const avgPosString = avgPos.map((pos) => `${pos[0]},${pos[1]},${pos[2]},`).join("");
          onLandmarksUpdate(avgPosString);
        }

        return newPoseList;
      });
    }
  };

  // 평균 좌표 계산
  const calAvgPos = (poseList) => {
    const numLandmarks = poseList[0].length;
    const avgPos = new Array(numLandmarks).fill([0, 0, 0]);

    poseList.forEach((pose) => {
      pose.forEach((lm, i) => {
        avgPos[i] = [avgPos[i][0] + lm[0]/5, avgPos[i][1] + lm[1]/5, avgPos[i][2] + lm[2]/5];
      });
    });

    return avgPos.map((lm) => lm.map((coord) => coord.toFixed(1)));
  };

  // 비디오 요소를 렌더링
  return <video ref={videoRef} style={{ display: "none" }} />;
};

export default MotionCapture;
