import { Document, Schema, model } from "mongoose";

export interface IUser {
    googleId: string;
    name: string;
    email: string;
    status: "online" | "offline";
    picture?: string | null;
}

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema<UserDocument>(
    {
        googleId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        status: { type: String, enum: ["online", "offline"], default: "offline" },
        picture: { type: String, default: null },
    },
    { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);
export default User;
