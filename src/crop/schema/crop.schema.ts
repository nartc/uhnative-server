import { model, Model, Schema } from 'mongoose';
import { schemaOptions } from '../../shared/models/shared.model';
import { ICropModel } from '../models/crop.model';

export const CropSchema = new Schema({
  name: String,
  variety: {
    type: [String],
    default: ['Unknown'],
  },
  pricePerPound: Number,
}, schemaOptions);

export const Crop: Model<ICropModel> = model<ICropModel>('Crop', CropSchema);