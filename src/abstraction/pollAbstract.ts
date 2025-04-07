import { IPoll, IPollDocument } from "../models/poll";
import { Request, Response } from "express";


export interface IPollRepository {
    createPoll(data: IPoll): Promise<IPoll>;
    getPolls(): Promise<IPoll[]>;
    getPollsById(id: string): Promise<IPollDocument | null>;
}

export interface IPollService {
    createPoll(data: IPoll): Promise<IPoll | undefined>;
    getPolls(): Promise<IPoll[]>;
    getPollsById(id: string): Promise<IPollDocument | null>;
}

export interface IPollController {
    createPoll(req: Request, res: Response): Promise<void>;
    getPolls(req: Request, res: Response): Promise<void>;
    getPollsById(req: Request, res: Response): Promise<void>;
}