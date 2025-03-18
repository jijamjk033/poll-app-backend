import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { chatRepository } from '../repositories/chatRepository';

let io: Server
const userSocketMap = new Map();
const userStatusMap = new Map();

export const setupSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: process.env.Frontend_URL,
            methods: ["GET", "POST"]
        }
    });
    io.on("connect", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("register", (userId) => {
            userSocketMap.set(userId, socket.id);
            userStatusMap.set(userId, "online");
            io.emit("userStatusChange", { userId, status: "online" });
            console.log(`User registered: ${userId} -> Socket ID: ${socket.id}, Status: Online`);
        });

        socket.on("joinChat", (chatId) => {
            socket.join(chatId);
        });

        socket.on('sendMessage', async (data) => {
            console.log('sendMessage event triggered:', data);
            const { chatId, sender, message } = data;
            if (!chatId || !sender || !message) {
                console.error('Invalid message data:', data);
                socket.emit('error', 'Invalid message data');
                return;
            }
            try {
                // const newMessage = await chatRepository.saveMessage(chatId, sender, message);
                // await chatRepository.updateChatLastMessage(chatId, message);
                // io.to(chatId).emit('newMessage', newMessage);
            } catch (error) {
                if (error instanceof Error)
                    console.error('Error handling sendMessage:', error.message);
                socket.emit('error', 'Message could not be saved');
            }
        });

        socket.on("disconnect", () => {
            let disconnectedUserId = null;
            for (let [userId, socketId] of userSocketMap.entries()) {
                if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    userStatusMap.set(userId, "offline");
                    disconnectedUserId = userId;
                    break;
                }
            }
            if (disconnectedUserId) {
                io.emit("userStatusChange", { userId: disconnectedUserId, status: "offline" });
                console.log(`User disconnected: ${disconnectedUserId}, Status: Offline`);
            }
        });

    });

}