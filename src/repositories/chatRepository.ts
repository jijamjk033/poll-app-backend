import { Date } from "mongoose";
import { Chat } from "../models/chatRoom";
import { Message } from "../models/message";
import { User } from "../models/userModel";

class ChatRepository {
    async findChatRoom(userId: string, selectedUser: string) {
        let chat = await Chat.findOne({
            participants: { $all: [userId, selectedUser] },
        });
        if (!chat) {
            chat = new Chat({
                participants: [userId, selectedUser],
            });
            await chat.save();
        }
        return chat;
    }

    async saveMessage(chatId: string, sender: string, text: string) {
        const message = new Message({
            chatId,
            sender,
            text,
            timestamp: new Date()
        });
        return await message.save();
    }

    async updateChatLastMessage(chatId: string, text: string) {
        return await Chat.findByIdAndUpdate(chatId, {
            lastMessage: text,
            lastUpdated: new Date()
        });
    }

    async findMessagesById(chatId: string) {
        try {
            const messages = await Message.find({ chatId }).exec();
            return messages;
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error finding messages:', err);
                throw new Error(`Failed to find messages for chatId ${chatId}: ${err.message}`);
            }
        }
    }

    async findChatRooms(userEmail: string) {
        try {
            const chatData = await Chat.find({ participants: userEmail }).exec();
            const chatRooms = await Promise.all(
                chatData.map(async (chat: { participants: string[]; _id: string; lastMessage: string; lastUpdated: Date; }) => {
                    const recipientEmail = chat.participants.find(email => email !== userEmail);
                    const recipient = recipientEmail
                        ? await User.findOne({ email: recipientEmail }).select('name email picture').lean()
                        : null;
                    return {
                        chatId: chat._id,
                        recipient: recipient
                            ? {
                                _id: recipient._id,
                                name: recipient.name,
                                email: recipient.email,
                                picture: recipient.picture
                            }
                            : null,
                        lastMessage: chat.lastMessage || '',
                        lastUpdated: chat.lastUpdated,
                    };
                })
            );

            return chatRooms;
        } catch (err) {
            console.error('Error finding chat rooms:', err);
            throw new Error(`Failed to find chat rooms for userEmail ${userEmail}: ${err instanceof Error ? err.message : err}`);
        }
    }

}

export const chatRepository = new ChatRepository();