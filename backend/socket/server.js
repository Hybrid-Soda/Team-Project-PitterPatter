const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000;

const rooms = new Set();

const userToRoom = {};
const roomToUsers = {};

app.use(
  cors({
    origin: "",
  })
);

io.origins("*:*");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/room-id", (req, res) => {
  let roomId;
  do {
    roomId = Math.floor(100000 + Math.random() * 900000);
  } while (rooms.has(roomId));
  res.send(roomId.toString());
});

app.get("/room/:roomId", (req, res) => {
  const roomId = req.params.roomId;
  if (!rooms.has(roomId)) {
    return res.status(404).send("Room not found");
  }
  let users = roomToUsers[roomId];
  if (users.length >= 2) {
    return res.status(400).send("Room is full");
  }
  res.send("OK");
});

io.on("connection", (socket) => {
  socket.on("init", (roomId) => {
    socket.join(roomId);
    rooms.add(roomId);
    userToRoom[socket.id] = roomId;
    if (!roomToUsers[roomId]) {
      roomToUsers[roomId] = [];
    }
    roomToUsers[roomId].push(socket.id);
    console.log(roomToUsers[roomId]);
    if (roomToUsers[roomId].length === 2) {
      let users = roomToUsers[roomId];
      users.forEach((user) => {
        io.to(user).emit("start");
      });
    }
  });

  socket.on("message", (message) => {
    const roomId = userToRoom[socket.id];
    const users = roomToUsers[roomId];
    for (let i = 0; i < users.length; i++) {
      if (users[i] === socket.id) {
        continue;
      }
      io.to(users[i]).emit("message", message);
    }
  });

  socket.on("disconnect", () => {
    const roomId = userToRoom[socket.id];
    if (roomToUsers[roomId]) {
      let users = roomToUsers[roomId];
      let index = users.indexOf(socket.id);
      if (index !== -1) {
        users.splice(index, 1);
      }
      if (users.length === 0) {
        rooms.delete(roomId);
        delete roomToUsers[roomId];
      } else {
        users.forEach((user) => {
          io.to(user).emit("user-disconnected");
        });
      }
    }
  });

  socket.on("finished", () => {
    const roomId = userToRoom[socket.id];
    const users = roomToUsers[roomId];
    for (let i = 0; i < users.length; i++) {
      if (users[i] === socket.id) {
        continue;
      }
      io.to(users[i]).emit("finished");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
