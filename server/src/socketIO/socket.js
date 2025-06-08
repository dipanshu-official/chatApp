import { Server } from "socket.io";
import http from "http";

let io;
const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

export const initSocket = (app) => {
  const server = http.createServer(app);

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
      console.log("a user disconnected", socket.id);
      delete users[userId];
      io.emit("getOnlineUsers", Object.keys(users));
    });
  });

  return server;
};
