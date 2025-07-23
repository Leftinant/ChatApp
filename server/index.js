import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import Message from "./models/Message.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const users = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    socket.username = username;
    users.set(socket.id, username);
    io.emit("online-users", Array.from(users.values()));
  });

  socket.on("join-room", ({ user1, user2 }) => {
    const room = [user1, user2].sort().join("-");
    socket.join(room);
  });

  socket.on("message", async ({ to, from, content }) => {
    const msg = new Message({ sender: from, receiver: to, content });
    await msg.save();

    const room = [from, to].sort().join("-");
    io.to(room).emit("private-message", msg);
  });

  socket.on("typing", ({ room, user }) => {
    socket.to(room).emit("typing", user);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    users.delete(socket.id);
    io.emit("online-users", Array.from(users.values()));
  });
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
