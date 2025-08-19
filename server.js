import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import  setupSockets  from "./sockets/index.js";
import dotenv from "dotenv";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

dotenv.config();

// const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
setupSockets(io);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
