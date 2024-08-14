// src/pages/Game/multiApi.js
import axios from "axios";
import io from "socket.io-client";

const host = "https://socket.picel.net";
const timeout = 5000;

export const fetchRoomId = async () => {
  try {
    const response = await axios.get(`${host}/room-id`, { timeout });
    return response.data;
  } catch (error) {
    console.error("Error fetching room ID:", error);
    throw error;
  }
};

export const initializeSocket = (
  roomId,
  onMessageReceived,
  onUserDisconnected,
  onStart,
  onFinished
) => {
  const socket = io(host);

  socket.emit("init", roomId);

  socket.on("message", (message) => {
    if (onMessageReceived) {
      onMessageReceived(message);
    }
  });

  socket.on("user-disconnected", (userId) => {
    if (onUserDisconnected) {
      onUserDisconnected(userId);
    }
  });

  socket.on("start", () => {
    if (onStart) {
      onStart();
    }
  });

  socket.on("finished", () => {
    if (onFinished) {
      onFinished();
    }
  });

  return socket;
};

export const sendMessage = (socket, message) => {
  socket.emit("message", message);
};

export const notifyFinished = (socket) => {
  socket.emit("finished");
};
