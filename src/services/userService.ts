import { IUserRepository, IUserService } from "../abstraction/userAbstract";
import { IUser } from "../models/userModel";
import { UserRepository } from "../repositories/userRepository";

class UserService implements IUserService {

    private userRepository:IUserRepository;
    constructor(userRepo:IUserRepository){
        this.userRepository = userRepo;
    };


    async loginWithGoogle(googleUser: any) {
        let user = await this.userRepository.findByGoogleId(googleUser.googleId);
        if (!user) {
            user = await this.userRepository.findUserByEmail(googleUser.email);
            if (!user) {
                user = await this.userRepository.createUser({
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
        return await this.userRepository.searchUsers(query);
    }

}
const userRepository = new UserRepository();
export const userService = new UserService(userRepository);