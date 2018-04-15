import { model, Model, Schema } from 'mongoose';
import { schemaOptions } from '../../shared/models/shared.model';
import { IHarvesterModel } from '../models/harvester.model';

export const HarvesterSchema = new Schema({
  firstName: String,
  lastName: String,
}, schemaOptions);

HarvesterSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

export const Harvester: Model<IHarvesterModel> = model<IHarvesterModel>('Harvester', HarvesterSchema);