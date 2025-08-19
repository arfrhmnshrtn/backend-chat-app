Backend Realtime Chat App
Overview
This is a Realtime Chat Backend built with Node.js, Express.js, MySQL, and Socket.IO. It supports:
•	User authentication (register/login) with JWT
•	1-to-1 direct messages
•	Text, image, file, emoji, and voice notes
•	Realtime messaging with Socket.IO
•	Tracking online/offline users
•	Secure password hashing with bcrypt
•	REST API endpoints for frontend integration

Tech Stack
•	Node.js & Express.js – Server & REST API
•	MySQL – Database
•	Socket.IO – Realtime WebSocket communication
•	JWT – Authentication & Authorization
•	bcrypt – Password hashing
•	dotenv – Environment variables
•	morgan – HTTP request logging
•	cors – Cross-origin support
Features
Authentication
•	Register: create new user account
•	Login: authenticate user and return JWT token
•	Protected routes: access restricted endpoints via JWT
Realtime Chat
•	1-to-1 messaging: send and receive messages in realtime
•	Broadcast / Direct message: messages only delivered to intended recipient
•	Online users: see who is currently online
•	Offline support: store messages in database for offline users

Project Structure
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
