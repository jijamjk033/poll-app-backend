import mongoose, { Document, Schema } from 'mongoose';

export interface IPoll {
    question: string;
    pollType: 'multiple' | 'yesno';
    options: string[];
}

export interface IPollDocument extends IPoll, Document {}

const pollSchema = new Schema<IPollDocument>({
    question: { type: String, required: true },
    pollType: { type: String, enum: ['multiple', 'yesno'], required: true },
    options: [{ type: String }]
}, { timestamps: true });

export const Poll = mongoose.model<IPollDocument>('Poll', pollSchema);