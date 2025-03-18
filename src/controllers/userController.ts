import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { userService } from "../services/userService";
import { createErrorResponse, createSuccessResponse } from "../helpers/responseHelpers";

class UserController {
    async googleLogin(req: Request, res: Response) {
        try {
            const user = await userService.loginWithGoogle(req.body);
            res.status(StatusCodes.OK).json(createSuccessResponse(user, "Login successful"));
        } catch (error) {
            console.error("Google login error:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse("Internal Server Error"));
        }
    }

    async searchUser(req: Request, res: Response) {
        try {
            const query = req.query.q as string;
            const users = await userService.searchUsers(query);
            res.status(StatusCodes.OK).json(createSuccessResponse(users, "Search successful"));
        } catch (error) {
            console.error("Error searching users:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse("Internal Server Error"));
        }
    }
}

export const userController = new UserController();