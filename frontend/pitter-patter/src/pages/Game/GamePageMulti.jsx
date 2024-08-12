import { MainWrap, MyGame, GraphWrap, BarWrap, Bar, NameWrap, Name } from "./GamePageMultiStyle";
import Header from "../LandingPage/Header";
import MultiSelectModal from "./MultiSelectModal";
import React, { useState, useEffect } from "react";
import { fetchRoomId, initializeSocket, sendMessage } from "./multiApi";
import { useNavigate } from "react-router-dom";

function GamePageMulti() {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const navigate = useNavigate();

  const handleJoinRoom = async (inputRoomId) => {
    try {
      setRoomId(inputRoomId);
      console.log(`Joining room ${inputRoomId}`);

      const newSocket = initializeSocket(
        inputRoomId,
        (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          console.log(`Received message: ${message}`);
        },
        () => {
          alert("상대방이 도망갔어요");
          navigate("/game/select-mode");
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

  const handleSendMessage = (message) => {
    if (socket) {
      sendMessage(socket, message);
    }
  };

  return (
    <MainWrap>
      <Header />
      <MyGame />
      <GraphWrap>
        <BarWrap>
          <Bar height={100} me/>
          <Bar height={30} />
        </BarWrap>
        <NameWrap>
          <Name me>나</Name>
          <Name>상대방</Name>
        </NameWrap>
      </GraphWrap>
      { isStarted ? <></> :
        <MultiSelectModal onJoinRoom={handleJoinRoom} onCreateRoom={handleCreateRoom} isWaiting={isWaiting} roomId={roomId} />
      }
    </MainWrap>
  );
}

export default GamePageMulti;
