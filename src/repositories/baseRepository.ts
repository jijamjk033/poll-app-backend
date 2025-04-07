import { Model, Document } from "mongoose";

export class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async findOne(filter: object): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    async findAll(filter: object = {}): Promise<T[]> {
        return this.model.find(filter).exec();
    }
    

    async create(data: Partial<T>): Promise<T> {
        const newItem = new this.model(data);
        return newItem.save();
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
