import { IPollRepository } from "../abstraction/pollAbstract";
import { CreatePollDTO, IPoll, IPollDocument, Poll } from "../models/poll";
import { BaseRepository } from "./baseRepository";

export class PollRepository extends BaseRepository<IPollDocument> implements IPollRepository {
    constructor() {
        super(Poll);
    }

    async createPoll(data: CreatePollDTO) {
        const { question, pollType, options } = data;
        let updatedOptions = options.map((text) => ({
            text,
            votes: 0,
        }));
        const pollData = {
            question,
            pollType,
            options:updatedOptions,
        };
        return this.create(pollData);
    }

    async getPolls() {
        return this.findAll();
    }

    async getPollsById(id: string) {
        return this.findById(id);
    }

    async savePoll(poll: IPollDocument) {
        return poll.save();
    }
}
