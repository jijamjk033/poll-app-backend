import { error } from "console";
import { IPollRepository, IPollService } from "../abstraction/pollAbstract";
import { IPoll } from "../models/poll";
import { PollRepository } from "../repositories/pollRepository";

export class PollService implements IPollService {
    private pollRepository: IPollRepository;
    constructor(pollRepo: IPollRepository) {
        this.pollRepository = pollRepo;
    }

    async createPoll(data: IPoll) {
        try {
            const poll = this.pollRepository.createPoll(data);
            if (!poll) {
                throw new Error('Poll creation failed');
            }
            return poll;
        } catch (err) {
            throw new Error(`Failed to create poll: ${err instanceof Error ? err.message : err}`);
        }
    }
    
    async getPolls() {
        try {
            const polls = this.pollRepository.getPolls();
            if (!polls) {
                throw new Error('Polls not found');
            }
            return polls;
        } catch (err) {
            throw new Error(`Failed to find polls: ${err instanceof Error ? err.message : err}`);
        }
    }

    async getPollsById(id: string) {
        try {
            const poll = this.pollRepository.getPollsById(id);
            if (!poll) {
                throw new Error('Poll creation failed');
            }
            return poll;
        } catch (err) {
            throw new Error(`Failed to find poll: ${err instanceof Error ? err.message : err}`);
        }
    }
}

const pollRepository = new PollRepository();
export const pollService = new PollService(pollRepository);
