# `Backend Realtime Chat App

## Overview

This is a **Realtime Chat Backend** built with **Node.js, Express.js, MySQL, and Socket.IO**. It supports:

* User authentication (register/login) with JWT
* 1-to-1 direct messages
* Text, image, file, emoji, and voice notes
* Realtime messaging with Socket.IO
* Tracking online/offline users
* Secure password hashing with bcrypt
* REST API endpoints for frontend integration

---

## Tech Stack

* **Node.js & Express.js** – Server & REST API
* **MySQL** – Database
* **Socket.IO** – Realtime WebSocket communication
* **JWT** – Authentication & Authorization
* **bcrypt** – Password hashing
* **dotenv** – Environment variables
* **morgan** – HTTP request logging
* **cors** – Cross-origin support

---

## Features

### Authentication

* **Register**: create new user account
* **Login**: authenticate user and return JWT token
* **Protected routes**: access restricted endpoints via JWT

### Realtime Chat

* **1-to-1 messaging**: send and receive messages in realtime
* **Broadcast / Direct message**: messages only delivered to intended recipient
* **Online users**: see who is currently online
* **Offline support**: store messages in database for offline users

---

## Project Structure

```text
backend-chat-app/
├─ controllers/       # Request handlers (auth, messages)
├─ models/            # Database models
├─ routes/            # API route definitions
├─ sockets/           # Socket.IO setup
├─ utils/             # JWT, hashing, helper functions
├─ config/            # Database configuration
├─ app.js             # Express app setup
├─ server.js          # HTTP + Socket.IO server
├─ package.json
└─ .env               # Environment variables
```

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/backend-chat-app.git
cd backend-chat-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure `.env`**

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=chat_app
JWT_SECRET=your_secret_key
```

4. **Run the server**

```bash
node server.js
```

> Or use PM2 for production:

```bash
npm install -g pm2
pm2 start server.js --name chat-app
pm2 logs chat-app
```

---

## API Endpoints

### Auth

| Method | URL                | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/auth/register | Register new user      |
| POST   | /api/auth/login    | User login and get JWT |

### Messages

| Method | URL                | Description                      |
| ------ | ------------------ | -------------------------------- |
| GET    | /api/messages      | Get all messages (requires auth) |
| POST   | /api/messages/send | Send new message (requires auth) |

> All routes requiring authentication need `Authorization: Bearer <JWT_TOKEN>` header.

---

## Realtime Events (Socket.IO)

| Event             | Direction       | Payload / Description                   |
| ----------------- | --------------- | --------------------------------------- |
| `auth:login`      | Client → Server | `{ token }`                             |
| `auth:ok`         | Server → Client | Login success                           |
| `auth:error`      | Server → Client | Invalid token                           |
| `message:private` | Client → Server | `{ toUserId, content }`                 |
| `message:new`     | Server → Client | `{ id, senderId, receiverId, content }` |
| `user:online`     | Server → Client | `[userId, ...]`                         |
| `user:offline`    | Server → Client | `userId`                                |

---

## Example REST Request

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456",
  "displayName": "John Doe"
}
```

```http
POST /api/messages/send
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "content": "Hello World"
}
```

---

## Example Socket.IO Usage (Client)

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Login
socket.emit("auth:login", { token: "<JWT_TOKEN>" });

socket.on("auth:ok", () => {
  console.log("Logged in successfully");
});

socket.on("auth:error", (msg) => {
  console.error(msg);
});

// Send private message
socket.emit("message:private", { toUserId: 2, content: "Hello!" });

// Listen for new messages
socket.on("message:new", (msg) => {
  console.log("New message:", msg);
});

// Track online users
socket.on("user:online", (users) => {
  console.log("Users online:", users);
});

socket.on("user:offline", (userId) => {
  console.log("User offline:", userId);
});
```

---

## License

MIT License © 2025 \Arief Rachman Sahertian
