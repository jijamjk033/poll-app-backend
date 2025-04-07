import { Request, Response } from "express";
import { IPollController, IPollService } from "../abstraction/pollAbstract";
import { pollService } from "../services/pollService";
import { StatusCodes } from 'http-status-codes';
import { createErrorResponse, createSuccessResponse } from "../helpers/responseHelpers";

export class PollController implements IPollController {
    private pollService: IPollService;
    constructor(pollService: IPollService) {
        this.pollService = pollService;
    }

    async createPoll(req: Request, res: Response) {
        try {
            console.log(req.body);
            
            const poll = await this.pollService.createPoll(req.body);
            res.status(StatusCodes.OK).json(createSuccessResponse(poll, "Poll created succesfully"));
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse("Internal Server Error"))
        }
    }

    async getPolls(req: Request, res: Response){
        try{
            const polls = await this.pollService.getPolls();
            res.status(StatusCodes.OK).json(createSuccessResponse(polls,'Polls fetched successfully'))
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse('Internal Server Error'));
        }
    }

    async getPollsById(req: Request, res: Response){
        try{
            const poll = await this.pollService.getPollsById(req.params.id);
            res.status(StatusCodes.OK).json(createSuccessResponse(poll,'Poll fetched successfully'));
        }catch(err){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorResponse('Internal Server Error'));
        }
    }
}

export const pollController = new PollController(pollService);