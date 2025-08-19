import jwt from "jsonwebtoken";
import { createMessage } from "../models/messageModel.js";

const onlineUsers = new Map();

function setupSockets(io) {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // Auth login via token
    socket.on("auth:login", ({ token }) => {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = payload.sub;
        onlineUsers.set(socket.userId, socket.id);

        socket.emit("auth:ok");
        io.emit("user:online", Array.from(onlineUsers.keys()));
      } catch (err) {
        socket.emit("auth:error", "Invalid token");
        socket.disconnect();
      }
    });

    // Kirim pesan
    socket.on("message:send", async (msg) => {
      if (!socket.userId) return;

      const messageId = await createMessage(socket.userId, msg.content);

      io.emit("message:new", {
        id: messageId,
        senderId: socket.userId,
        content: msg.content,
        createdAt: new Date(),
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit("user:offline", socket.userId);
      }
      console.log("User disconnected", socket.id);
    });
  });
}

export default setupSockets;
