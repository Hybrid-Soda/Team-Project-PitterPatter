import React, { useEffect, useRef, useState } from "react";

const MotionCapture = ({ onLandmarksUpdate }) => {
  const videoRef = useRef(null);
  const [poseList, setPoseList] = useState([]);
  const width = 640;
  const height = 480;
  let camera = null;

  useEffect(() => {
    const loadMediapipeModules = async () => {
      try {
        const pose = new Pose({
          locateFile: (file) =>
            `/mediapipe/pose/${file}`,
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        pose.onResults(onPose);

        const videoElement = videoRef.current;
        if (videoElement) {
          camera = new Camera(videoElement, {
            onFrame: async () => {
              await pose.send({ image: videoElement });
            },
          });
          camera.start();
        }
      } catch (error) {
        console.error("Mediapipe 모듈을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    loadMediapipeModules();

    return () => {
      const videoElement = videoRef.current;
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
      }
      if (camera) {
        camera.stop();
        camera = null;
      }
    };
  }, []);

  const onPose = (results) => {
    if (results.poseLandmarks) {
      const landmarks = results.poseLandmarks.map((lm) => [
        (1 - lm.x) * width,
        (1 - lm.y) * height,
        (1 - lm.z) * width,
      ]);
      setPoseList((prevPoseList) => {
        const newPoseList = [...prevPoseList, landmarks];
        if (newPoseList.length > 5) newPoseList.shift();
        if (newPoseList.length === 5) {
          const avgPos = calAvgPos(newPoseList);
          const avgPosString = avgPos
            .map((pos) => `${pos[0]},${pos[1]},${pos[2]},`)
            .join("");
          onLandmarksUpdate(avgPosString);
        }
        return newPoseList;
      });
    }
  };

  const calAvgPos = (poseList) => {
    const numLandmarks = poseList[0].length;
    const avgPos = new Array(numLandmarks).fill([0, 0, 0]);
    poseList.forEach((pose) => {
      pose.forEach((lm, i) => {
        avgPos[i] = [
          avgPos[i][0] + lm[0] / 5,
          avgPos[i][1] + lm[1] / 5,
          avgPos[i][2] + lm[2] / 5,
        ];
      });
    });
    return avgPos.map((lm) => lm.map((coord) => coord.toFixed(1)));
  };

  return <video ref={videoRef} style={{ display: "none" }} />;
};

export default MotionCapture;
