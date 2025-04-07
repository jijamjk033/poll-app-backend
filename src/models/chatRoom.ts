import mongoose, { Document, Schema } from "mongoose";

export interface IChat {
    participants: string[];
    lastMessage: string;
    lastUpdated: Date;
}

export interface ChatDocument extends IChat, Document {}

const ChatSchema = new Schema<ChatDocument>({
    _id: { type: String, required: true },
    participants: { type: [String], required: true },
    lastMessage: { type: String, default: "" },
    lastUpdated: { type: Date, default: Date.now },
});

export const Chat = mongoose.model<ChatDocument>("Chat", ChatSchema);
