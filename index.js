require("dotenv").config();

const express = require("express");
const http = require("http");
const { connect } = require("./db/db");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");
const { Socket } = require("socket.io");
const { Server } = require("socket.io");
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connect();

app.use("/", userRoutes);

io.on("connection", (socket) => {
  console.log("user connected with id:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room:", data);
  });

  socket.on("send_message", (data) => {
    try {
      console.log(data);
      const send = socket.to(data.room).emit("receive", data);
      if(send) {
        console.log(`Message sent to room ${data.room}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  socket.on("disconnect", () => console.log("User Disconnected", socket.id));
});

server.listen(5000, () => console.log("server started"));
