import { MainWrap, GraphWrap, BarWrap, Bar, NameWrap, Name } from "./GamePageMultiStyle";
import Header from "../LandingPage/Header";
import MultiSelectModal from "./MultiSelectModal";
import React, { useState, useEffect } from "react";
import { fetchRoomId, initializeSocket, sendMessage } from "./multiApi";
import { useNavigate } from "react-router-dom";
import Unity from "./Unity";
import AttModal from "./AttModal";
import { useSelector } from "react-redux";
import { getWallpaper } from "./gameApi.js";
import { assetsApi, gameApi } from "../../apiService.js";
import WebcamTestPage from "../Game/WebcamTestPage";
import Loader from "../Components/loader.jsx";
import IsReady from "../Game/IsReady";
import DodgeAlertModal from "./DodgeAlertModal.jsx";

function GamePageMulti() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [attModalOpen, setAttModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [score, setScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [dodgeAlertModalOpen, setDodgeAlertModalOpen] = useState(false);
  
  const token = useSelector((state) => state.token.accessToken);
  const childId = useSelector((state) => state.child.id);

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

  const openAttModal = async () => {
    try {
      const firstResponse = await gameApi.post(`/${childId}`, {
        score: 0,
        playtime: 0,
        burnedCalorie: 0,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('첫 번째 요청 성공:', firstResponse.data);

      if (firstResponse.data.result === true) {
        const secondResponse = await assetsApi.patch('/point', {
          amount: 12,
          source: '게임 플레이 보상',
          childId: childId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('두 번째 포인트 지급 성공:', secondResponse.data);      
        setAttModalOpen(true);
      } else {
        const secondResponse = await assetsApi.patch('/point', {
          amount: 2,
          source: '게임 플레이 보상',
          childId: childId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('두 번째 포인트 지급 성공:', secondResponse.data);
      }

    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  const closeAttModal = () => {
    setAttModalOpen(false);
  };

  useEffect(() => {
    openAttModal();
    getWallpaper(childId); // childId를 넣으면 그 아이가 착용하고 있는 벽의 이미지 주소가 return됨
  }, [childId]);

  return (
    <MainWrap>
      <Header />
      {testCompleted ? (
        <div>
          {isLoading && <Loader />}
          <Unity onGameEnd={openAttModal} isLoading={isLoading} setIsLoading={setIsLoading} score={score} setScore={setScore} />
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
      {attModalOpen && <AttModal onClose={closeAttModal} />}
      {dodgeAlertModalOpen && <DodgeAlertModal onClose={() => navigate("/game/select-mode")} />}
    </MainWrap>
  );
}

export default GamePageMulti;
