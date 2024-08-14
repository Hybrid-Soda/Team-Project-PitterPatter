import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../LandingPage/Header";
import {
  MainWrap,
  CenterColumn,
  CenterRow,
  Title,
  Frame,
  BlankRow,
  Blank,
  UserImg,
  AddImg,
  GoResultButton,
  Modal,
  ModalContent,
  ViewFinder,
  Countdown,
} from "./SnapshotStyle";
import AddImageIcon from "/src/assets/icons/AddImage.png";
import EG1 from "/src/assets/img/Snapshot/eg1.png";
import EG2 from "/src/assets/img/Snapshot/eg2.png";
import EG3 from "/src/assets/img/Snapshot/eg3.png";
import EG4 from "/src/assets/img/Snapshot/eg4.png";

import Beep from "/src/assets/sound/beep.mp3";
import Shutter from "/src/assets/sound/shutter.mp3";

function Snapshot() {
  const [imageList, setImageList] = useState([null, null, null, null]);
  const navigate = useNavigate();
  const BlankRefs = useRef([]);
  const [isFilled, setIsFilled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoStream, setModalVideoStream] = useState(null);
  const [countdown, setCountdown] = useState(3); // countdown 상태 추가
  const videoRef = useRef(null); // 비디오 ref 추가

  const FrameImage = "https://ssafy-common.b-cdn.net/frame_" + useSelector((state) => state.item.frameItem) + ".png";

  function getImage(index) {

    if (imageList[index]) {
      setImageList(imageList.map((img, i) => (i === index ? null : img)));
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const canvasWidth = 140;
    const canvasHeight = 126;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.objectFit = "cover";

    let stream = null;

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        stream = mediaStream;
        setModalVideoStream(mediaStream);
        setIsModalOpen(true);
        setCountdown(3); // 초기 카운트다운 설정

        const beep = new Audio(Beep);
        beep.play();

        const interval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              const shutter = new Audio(Shutter);
              shutter.play();
              clearInterval(interval);

              const video = videoRef.current;
              const videoWidth = video.videoWidth;
              const videoHeight = video.videoHeight;
              const aspectRatio = canvasWidth / canvasHeight;
              let cropWidth, cropHeight;

              if (videoWidth / videoHeight > aspectRatio) {
                cropHeight = videoHeight;
                cropWidth = videoHeight * aspectRatio;
              } else {
                cropWidth = videoWidth;
                cropHeight = videoWidth / aspectRatio;
              }

              const cropX = (videoWidth - cropWidth) / 2;
              const cropY = (videoHeight - cropHeight) / 2;

              ctx.translate(canvasWidth, 0);
              ctx.scale(-1, 1);

              ctx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, canvasWidth, canvasHeight);
              const image = canvas.toDataURL("image/png");
              setImageList(imageList.map((img, i) => (i === index ? image : img)));

              let tracks = stream.getTracks();
              tracks.forEach(function (track) {
                track.stop();
              });

              video.srcObject = null;
              setIsModalOpen(false);
              setModalVideoStream(null);
            } else {
              const beep = new Audio(Beep);
              beep.play();
            }
            return prevCountdown - 1;
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (imageList.every((img) => img !== null)) {
      setIsFilled(true);
    }
  }, [imageList, navigate]);

  useEffect(() => {
    if (videoRef.current && modalVideoStream) {
      videoRef.current.srcObject = modalVideoStream;
    }
  }, [modalVideoStream]);

  return (
    <MainWrap>
      <Header />
      <CenterColumn>
        <Title>피터와 패터를 따라 사진을 찍어보세요 !</Title>
        <CenterRow>
          <Frame style={{ backgroundImage: `url(${FrameImage})` }}>
            <BlankRow>
              <Blank>
                <UserImg src={EG1} alt="example" />
              </Blank>
              <Blank>
                <UserImg src={EG2} alt="example" />
              </Blank>
            </BlankRow>
            <BlankRow>
              <Blank>
                <UserImg src={EG3} alt="example" />
              </Blank>
              <Blank>
                <UserImg src={EG4} alt="example" />
              </Blank>
            </BlankRow>
          </Frame>
          <Frame style={{ backgroundImage: `url(${FrameImage})` }}>
            <BlankRow>
              <Blank onClick={() => getImage(0)} active ref={(el) => (BlankRefs.current[0] = el)}>
                {(imageList[0] && <UserImg src={imageList[0]} alt="snapshot" />) || (
                  <AddImg src={AddImageIcon} alt="add" />
                )}
              </Blank>
              <Blank onClick={() => getImage(1)} active ref={(el) => (BlankRefs.current[1] = el)}>
                {(imageList[1] && <UserImg src={imageList[1]} alt="snapshot" />) || (
                  <AddImg src={AddImageIcon} alt="add" />
                )}
              </Blank>
            </BlankRow>
            <BlankRow>
              <Blank onClick={() => getImage(2)} active ref={(el) => (BlankRefs.current[2] = el)}>
                {(imageList[2] && <UserImg src={imageList[2]} alt="snapshot" />) || (
                  <AddImg src={AddImageIcon} alt="add" />
                )}
              </Blank>
              <Blank onClick={() => getImage(3)} active ref={(el) => (BlankRefs.current[3] = el)}>
                {(imageList[3] && <UserImg src={imageList[3]} alt="snapshot" />) || (
                  <AddImg src={AddImageIcon} alt="add" />
                )}
              </Blank>
            </BlankRow>
          </Frame>
        </CenterRow>
      </CenterColumn>
      {isFilled && (
        <GoResultButton onClick={() => navigate("./result", { state: { imageList } })}>
          결과 확인하기
        </GoResultButton>
      )}
      {isModalOpen && (
        <>
          <Modal>
            <ModalContent>
              <ViewFinder autoPlay muted ref={videoRef} style={{ transform: "scaleX(-1)" }}></ViewFinder>
            </ModalContent>
          </Modal>
          <Countdown>
            <span>{countdown}</span>
          </Countdown>
        </>
      )}
    </MainWrap>
  );
}

export default Snapshot;
