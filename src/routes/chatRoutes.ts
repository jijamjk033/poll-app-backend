import express from 'express';
import { ChatRepository } from '../repositories/chatRepository';
import { ChatService } from '../services/chatServises';
import { ChatController, chatService } from '../controllers/chatController';

const router = express.Router();


const chatController = new ChatController(chatService);

router.post('/initiate', chatController.initiateChat.bind(chatController));
router.get('/getChats/:userId', chatController.getUserChatRooms.bind(chatController));
router.post('/:chatId/message', chatController.messageSend.bind(chatController));
router.get('/:chatId/chatRoomMessages', chatController.getChatMessages.bind(chatController));

export default router;