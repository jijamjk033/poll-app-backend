import mongoose, { Document, Schema } from 'mongoose';

export interface IPollOption {
    text: string;
    votes?: number;
  }
  
  export interface IPoll {
    question: string;
    pollType: 'multiple' | 'yesno';
    options: IPollOption[];
  }

  export interface CreatePollDTO {
    question: string;
    pollType: 'multiple' | 'yesno';
    options: string[]; // plain strings
  }
  

export interface IPollDocument extends IPoll, Document {}

const pollSchema = new Schema<IPollDocument>({
    question: { type: String, required: true },
    pollType: { type: String, enum: ['multiple', 'yesno'], required: true },
    options: [
        {
          text: String,
          votes: {
            type: Number,
            default: 0
          }
        }
      ]
}, { timestamps: true });

export const Poll = mongoose.model<IPollDocument>('Poll', pollSchema);