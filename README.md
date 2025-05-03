## 🗳️ Poll App – MEAN Stack Application with Real-Time Chat 💬

This is a full-featured Poll Application built using the MEAN stack (MongoDB, Express, Angular, Node.js) with Socket.IO-powered real-time chat. Users can vote on polls and interact with other participants in real time through chat rooms.

This project is hosted and live: https://www.pollapp.homeserviceapp.site

## ✨ Features

## 👥 User Side

User registration and login (JWT-based)

View and participate in active polls

Submit a vote (restricted to one vote per poll)

See live poll results instantly

Join poll-specific real-time chat rooms via Socket.IO

## 🛠️ Admin Side

Admin login with role-based access

Create, edit, and delete polls

Enable/disable voting and chat for each poll

Moderate poll chats (optional enhancement)

View poll statistics and user engagement

## 🧰 Tech Stack

Frontend: Angular

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT

Real-Time Communication: Socket.IO

UI Styling: Angular Material / Tailwind CSS (as per your implementation)

Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## 📁 Folder Structure

poll-app-backend/
├── controllers/
├── models/
├── routes/
├── socket/# Socket.IO logic
├── middleware/
├── utils/
├── .env
└── server.js

## 🚀 Getting Started

🛠 Backend Setup

git clone https://github.com/yourusername/poll-app-backend.git
cd poll-app-backend
npm install

Create a .env file:
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

Start backend server:
node server.js

## 📡 Real-Time Chat

Each poll acts as a chat room.

Users can join rooms when viewing a poll.

Messages are broadcast live using Socket.IO.

Message history is preserved in MongoDB (if implemented).
