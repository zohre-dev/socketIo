import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

// io.emit()
// io.to().emit()
// io.on();
const port = process.env.PORT;
server.listen(port, () => {
  console.log("server is running");
});
