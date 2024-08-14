import { MainWrap, GraphWrap, BarWrap, Bar, NameWrap, Name } from "./GamePageMultiStyle";
import Header from "../LandingPage/Header";
import MultiSelectModal from "./MultiSelectModal";
import { useState, useEffect } from "react";
import { fetchRoomId, initializeSocket, notifyFinished, sendMessage } from "./multiApi";
import { useNavigate } from "react-router-dom";
import Unity from "./Unity";
import { useSelector } from "react-redux";
import { getWallpaper } from "./gameApi.js";
import WebcamTestPage from "../Game/WebcamTestPage";
import Loader from "../Components/loader.jsx";
import IsReady from "../Game/IsReady";
import DodgeAlertModal from "./DodgeAlertModal.jsx";
import MultiResultModal from "./MultiResultModal.jsx";

function GamePageMulti() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [score, setScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [dodgeAlertModalOpen, setDodgeAlertModalOpen] = useState(false);
  const [isRivalFinished, setIsRivalFinished] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const childId = useSelector((state) => state.child.id);
  const backgroundNum = parseInt(useSelector((state) => state.item.backgroundItem));

  const navigate = useNavigate();

  const handleJoinRoom = async (inputRoomId) => {
    try {
      setRoomId(inputRoomId);
      console.log(`Joining room ${inputRoomId}`);

      setModalOpen(true);

      const newSocket = initializeSocket(
        inputRoomId,
        (message) => {
          console.log("Message received:", message);
          setMessages((prevMessages) => [...prevMessages, message]);
          setRivalScore(message);
        },
        () => {
          setDodgeAlertModalOpen(true);
        },
        () => {
          console.log("Game started");
          setIsStarted(true);
        },
        () => {
          console.log("Game finished");
          setIsRivalFinished(true);
        }
      );
      setSocket(newSocket);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const newRoomId = await fetchRoomId();
      setRoomId(newRoomId);
      setIsWaiting(true);

      handleJoinRoom(newRoomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleTestComplete = () => {
    setTestCompleted(true);
    setIsLoading(true); // 로딩 시작
    setTimeout(() => setIsLoading(false), 2000); // 2초 후 로딩 끝
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // check if the score changed, then send the score to the server
  useEffect(() => {
    if (score !== 0) {
      sendMessage(socket, score);
    }
  }, [score]);

  const onGameEnd = () => {
    setIsFinished(true);
    setResultModalOpen(true);
    notifyFinished(socket);
  };

  useEffect(() => {
    getWallpaper(childId); // childId를 넣으면 그 아이가 착용하고 있는 벽의 이미지 주소가 return됨
  }, [childId]);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? (
        <div>
          {isLoading && <Loader />}
          <Unity onGameEnd={onGameEnd} isLoading={isLoading} setIsLoading={setIsLoading} score={score} setScore={setScore} backgroundNum={backgroundNum} />
        </div>
      ) : (
        <WebcamTestPage onTestComplete={handleTestComplete} />
      )}
      <GraphWrap>
        <BarWrap>
          <Bar height={score} me />
          <Bar height={rivalScore} />
        </BarWrap>
        <NameWrap>
          <Name me>나<br /><br />{score}</Name>
          <Name>상대<br /><br />{rivalScore}</Name>
        </NameWrap>
      </GraphWrap>
      { isStarted ? <></> :
        <MultiSelectModal onJoinRoom={handleJoinRoom} onCreateRoom={handleCreateRoom} isWaiting={isWaiting} roomId={roomId} />
      }
      {modalOpen && <IsReady onClose={closeModal} />}
      {resultModalOpen && <MultiResultModal onClose={() => navigate("/game/select-mode")} myScore={score} rivalScore={rivalScore} isGameEnd={isRivalFinished && isFinished ? true : undefined} />}
      {dodgeAlertModalOpen && <DodgeAlertModal onClose={() => navigate("/game/select-mode")} />}
    </MainWrap>
  );
}

export default GamePageMulti;
