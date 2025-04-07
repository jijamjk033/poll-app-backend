import { IUser } from "../models/userModel";
import { Request, Response } from "express";

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    findByGoogleId(googleId: string): Promise<IUser | null>;
    createUser(userData: Partial<IUser>): Promise<IUser>;
    searchUsers(query: string): Promise<Partial<IUser>[]>;
}

export interface IUserService {
    loginWithGoogle(googleUser: any):Promise<IUser>;
    searchUsers(query: string): Promise<Partial<IUser>[]>;
}

export interface IUserController {
    googleLogin(req: Request, res: Response):Promise<void>;
    searchUser(req: Request, res: Response):Promise<void>;
}