import { Chat, ChatDocument} from "../models/chatRoom";
import { Message } from "../models/message";
import { BaseRepository } from "./baseRepository";
import { IChatRepository } from "../abstraction/chatAbstract";
import User from "../models/userModel";

export class ChatRepository extends BaseRepository<ChatDocument> implements IChatRepository {
    constructor() {
        super(Chat);
    }

    async findChatRoom(userId: string, selectedUser: string) {
        let chat = await this.model.findOne({ participants: { $all: [userId, selectedUser] } });
        if (!chat) {
            chat = await this.model.create({ participants: [userId, selectedUser] });
        }
        return chat;
    }

    async saveMessage(chatId: string, sender: string, text: string) {
        const message = new Message({ chatId, sender, text, timestamp: new Date() });
        return message.save();
    }

    async updateChatLastMessage(chatId: string, text: string) {
        return this.update(chatId, { lastMessage: text, lastUpdated: new Date() });
    }

    async findMessagesById(chatId: string) {
        try {
            const messages = await Message.find({ chatId }).exec();
            return messages || [];
        } catch (err) {
            throw new Error(`Failed to find messages for chatId ${chatId}: ${err instanceof Error ? err.message : err}`);
        }
    }
    
    async findChatRooms(userEmail: string) {
        try {
            const chatData = await this.findAll({ participants: userEmail });
            const chatRooms = await Promise.all(
                chatData.map(async (chat: ChatDocument) => { 
                    const recipientEmail = chat.participants.find(email => email !== userEmail);
                    const recipient = recipientEmail
                        ? await User.findOne({ email: recipientEmail })
                            .select("name email picture")
                            .lean()
                        : null;
                    return {
                        chatId: chat._id as string,
                        recipient: recipient
                            ? {
                                _id: recipient._id.toString(),
                                name: recipient.name,
                                email: recipient.email,
                                picture: recipient.picture || null
                            }
                            : null,
                        lastMessage: chat.lastMessage || "",
                        lastUpdated: chat.lastUpdated,
                    };
                })
            );
            return chatRooms;
        } catch (err) {
            console.error("Error finding chat rooms:", err);
            throw new Error(`Failed to find chat rooms for userEmail ${userEmail}: ${err instanceof Error ? err.message : err}`);
        }
    }  
}
