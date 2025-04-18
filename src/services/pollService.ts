import { error } from "console";
import { IPollRepository, IPollService } from "../abstraction/pollAbstract";
import { CreatePollDTO, IPoll, IPollOption } from "../models/poll";
import { PollRepository } from "../repositories/pollRepository";

export class PollService implements IPollService {
    private pollRepository: IPollRepository;
    constructor(pollRepo: IPollRepository) {
        this.pollRepository = pollRepo;
    }

    async createPoll(data: CreatePollDTO) {
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

    async saveVote(pollId: string, selectedOption: IPollOption) {
        const poll = await this.pollRepository.getPollsById(pollId);
        if (!poll) throw new Error('Poll not found');
        const option = poll.options.find(opt => opt.text === selectedOption.text);
        if (!option) throw new Error('Option not found');
        if (option.votes != null) {
            option.votes += 1;
        } else {
            option.votes = 1;
        }
        return this.pollRepository.savePoll(poll);
    }

}

const pollRepository = new PollRepository();
export const pollService = new PollService(pollRepository);
