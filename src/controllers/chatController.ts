import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { createErrorResponse, createSuccessResponse } from "../helpers/responseHelpers";
import { chatService } from "../services/chatServises";

class ChatController {
    async initiateChat(req: Request, res: Response) {
        try {
            const { userId, selectedUser } = req.body;
            const result = await chatService.initiateChat(userId, selectedUser);
            res.status(StatusCodes.OK).json(createSuccessResponse(result, 'Chat initiated successfully'));
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).json(createErrorResponse('Error initiating chat'));
        }
    }

    async messageSend(req: Request, res: Response) {
        try {
            const { text, sender } = req.body;
            const chatId = req.params.chatId;
            const result = await chatService.messageSent(chatId, sender, text);
            res.status(StatusCodes.OK).json(createSuccessResponse(result, 'Message sent successfully'));
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).json(createErrorResponse('Error sending message'));
        }
    }

    async getChatMessages(req: Request, res: Response) {
        try {
            const chatId = req.params.chatId;
            const messages = await chatService.getChatMessages(chatId);
            res.status(StatusCodes.OK).json(createSuccessResponse(messages, 'Messages fetched successfully'));
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).json(createErrorResponse('Error fetching messages'));
        }
    }

    async getUserChatRooms(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const chatData = await chatService.getChatRooms(userId);
            res.status(StatusCodes.OK).json(createSuccessResponse(chatData, 'Chat details fetched successfully'));
        } catch (err) {
            res.status(StatusCodes.BAD_REQUEST).json(createErrorResponse('Error fetching chat details'));
        }
    }
}

export const chatController = new ChatController();