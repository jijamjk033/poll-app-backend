import { IUser } from "../models/userModel";
import { userRepository } from "../repositories/userRepository";

class UserService {

    async loginWithGoogle(googleUser: any) {
        let user = await userRepository.findByGoogleId(googleUser.googleId);
        if (!user) {
            user = await userRepository.findUserByEmail(googleUser.email);
            if (!user) {
                user = await userRepository.createUser({
                    googleId: googleUser.googleId,
                    name: googleUser.name,
                    email: googleUser.email,
                    picture: googleUser.picture,
                });
            }
        }
        return user as IUser;
    }

    async searchUsers(query: string) {
        return await userRepository.searchUsers(query);
    }

}

export const userService = new UserService();