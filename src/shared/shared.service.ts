import { Document, Model } from 'mongoose';

export class SharedService<T extends Document> {

  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(resource: T): Promise<T> {
    return this._model.create(resource);
  }

  async createFromBody(body: Partial<T>): Promise<T> {
    return this._model.create({ ...(body as any) });
  }

  async delete(id: string): Promise<T> {
    return this._model.findByIdAndRemove(id).exec();
  }

  async getAll(): Promise<T[]> {
    return this._model.find().exec();
  }

  async getById(id: string): Promise<T> {
    return this._model.findById(id).exec();
  }

  async getByIds(ids: string[]): Promise<T[]> {
    return this._model.find({ _id: { $in: ids } }).exec();
  }

  async update(resource: T): Promise<T> {
    return this._model.findByIdAndUpdate(resource._id, resource, { new: true }).exec();
  }

  async updateFromBody(body: Partial<T>): Promise<T> {
    const existed: T = await this._model.findById(body._id).exec();

    const updated: T = {
      _id: existed._id,
      ...(body as any),
    };

    return this._model.findByIdAndUpdate(updated._id, updated, { new: true }).exec();
  }

  async getOne(value: any, queryBy: string = '_id'): Promise<T> {
    const query = {};
    query[queryBy] = value;
    return this._model.findOne(query).exec();
  }
}