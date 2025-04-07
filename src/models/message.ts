const mongoose = require('mongoose');

export interface IMessage {
  chatId: string;
  sender: string;
  text: string;
  fileUrl: string;
  messageType: string;
  timestamp: Date;
}

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  sender: String,
  text: String,
  fileUrl: String,
  messageType: { type: String, enum: ["text", "image", "file"], default: "text" },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', MessageSchema);