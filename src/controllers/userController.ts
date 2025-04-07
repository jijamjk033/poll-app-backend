import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { userService } from "../services/userService";
import { createErrorResponse, createSuccessResponse } from "../helpers/responseHelpers";
import { IUserController, IUserService } from "../abstraction/userAbstract";

class UserController implements IUserController {

    private userService: IUserService;
    constructor(userService: IUserService) {
        this.userService = userService;
    }

    async googleLogin(req: Request, res: Response) {
        try {
            const user = await this.userService.loginWithGoogle(req.body);
            res.status(StatusCodes.OK).json(createSuccessResponse(user, "Login successful"));
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse("Internal Server Error"));
        }
    }

    async searchUser(req: Request, res: Response) {
        try {
            const query = req.query.q as string;
            const users = await this.userService.searchUsers(query);
            res.status(StatusCodes.OK).json(createSuccessResponse(users, "Search successful"));
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse("Internal Server Error"));
        }
    }
}

export const userController = new UserController(userService);