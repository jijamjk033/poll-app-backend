import { IChatRepository, IChatService } from "../abstraction/chatAbstract";
import { ChatDocument } from "../models/chatRoom";


export class ChatService implements IChatService {

    private ChatRepository: IChatRepository;
    constructor(chatRepo: IChatRepository) {
        this.ChatRepository = chatRepo;
    }

    async initiateChat(userId: string, selectedUser: string) {
        try {
            let chat: ChatDocument | null = await this.ChatRepository.findChatRoom(userId, selectedUser);
            if (!chat) {
                throw new Error("Chat could not be initiated");
            }
            return { chatId: chat._id as string };
        } catch (err) {
            throw new Error(`Failed to initiate chat: ${err instanceof Error ? err.message : err}`);
        }
    }

    async messageSent(chatId: string, sender: string, text: string) {
        if (!chatId || !sender || !text) {
            throw new Error("Invalid message data: chatId, sender, and text are required.");
        }
        try {
            const message = await this.ChatRepository.saveMessage(chatId, sender, text);
            await this.ChatRepository.updateChatLastMessage(chatId, text);
            return message;
        } catch (err) {
            throw new Error(`Failed to send message: ${err instanceof Error ? err.message : err}`);
        }
    }


    async getChatMessages(chatId: string) {
        try {
            const messages = await this.ChatRepository.findMessagesById(chatId);
            return messages;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Failed to fetch message: ${err.message}`);
            }
            throw err;
        }
    }

    async getChatRooms(userId: string) {
        try {
            const chatData = await this.ChatRepository.findChatRooms(userId);
            return chatData;
        } catch (err) {
            if (err instanceof Error) {
                throw new Error(`Failed to fetch chat details: ${err.message}`);
            }
            throw err;
        }
    }
}
