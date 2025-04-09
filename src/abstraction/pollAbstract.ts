import { CreatePollDTO, IPoll, IPollDocument, IPollOption } from "../models/poll";
import { Request, Response } from "express";


export interface IPollRepository {
    createPoll(data:CreatePollDTO ): Promise<IPoll>;
    getPolls(): Promise<IPoll[]>;
    getPollsById(id: string): Promise<IPollDocument | null>;
    savePoll(poll:IPollDocument):Promise<IPoll>
}

export interface IPollService {
    createPoll(data: CreatePollDTO): Promise<IPoll | undefined>;
    getPolls(): Promise<IPoll[]>;
    getPollsById(id: string): Promise<IPollDocument | null>;
    saveVote(pollId: string, selectedOption: IPollOption):Promise<IPoll>;
}

export interface IPollController {
    createPoll(req: Request, res: Response): Promise<void>;
    getPolls(req: Request, res: Response): Promise<void>;
    getPollsById(req: Request, res: Response): Promise<void>;
}