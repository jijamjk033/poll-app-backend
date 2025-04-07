import { ChatDocument, IChat} from "../models/chatRoom";
import { IMessage } from "../models/message";

export interface IChatRepository {
    findChatRoom(userId: string, selectedUser: string): Promise<ChatDocument | null>;
    saveMessage(chatId: string, sender: string, text: string): Promise<IMessage>;
    updateChatLastMessage(chatId: string, text: string): Promise<IChat | null>;
    findMessagesById(chatId: string): Promise<ChatDocument[]>;
    findChatRooms(userEmail: string): Promise<{chatId:string, recipient: { _id: string; name:string, email: string; picture: string | null; } | null; lastMessage: string; lastUpdated: Date; }[]>;
}



export interface IChatService {
    initiateChat(userId: string, selectedUser: string): Promise<{ chatId: any; } | undefined>;
    messageSent(chatId: string, sender: string, text: string): Promise<IMessage | undefined>;
    getChatMessages(chatId: string): Promise<ChatDocument[]>;
    getChatRooms(userId: string): Promise<{ recipient: { _id: string; email: string; picture: string | null; } | null; lastMessage: string; lastUpdated: Date; }[]>;
}

export interface IChatController {
    initiateChat(req: any, res: any): Promise<void>;
    messageSend(req: any, res: any): Promise<void>;
    getChatMessages(req: any, res: any): Promise<void>;
    getUserChatRooms(req: any, res: any): Promise<void>;
}