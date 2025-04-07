import { IPollRepository } from "../abstraction/pollAbstract";
import { IPoll, IPollDocument, Poll } from "../models/poll";
import { BaseRepository } from "./baseRepository";

export class PollRepository extends BaseRepository<IPollDocument> implements IPollRepository {
    constructor() {
        super(Poll);
    }

    async createPoll(data: IPoll) {
        return this.create(data);
    }

    async getPolls() {
        return this.findAll();
    }

    async getPollsById(id: string) {
        return this.findById(id);
    }
}
