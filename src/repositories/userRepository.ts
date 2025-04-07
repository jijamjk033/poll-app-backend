import { IUserRepository } from "../abstraction/userAbstract";
import User, { IUser, UserDocument } from "../models/userModel";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository<UserDocument> implements IUserRepository {
    constructor() {
        super(User);
    }
    async findUserByEmail(email: string): Promise<IUser | null> {
        return await this.model.findOne({ email }).lean();
    }

    async findByGoogleId(googleId: string): Promise<IUser | null> {
        return await this.model.findOne({ googleId }).lean();
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new this.model(userData);
        const savedUser = await user.save();
        return savedUser.toObject();
    }

    async searchUsers(query: string): Promise<IUser[]> {
        return await this.model
            .find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } },
                ],
            })
            .select("name email picture")
            .lean();
    }
}
