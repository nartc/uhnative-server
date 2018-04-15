import { model, Model, Schema } from 'mongoose';
import { schemaOptions } from '../../shared/models/shared.model';
import { IFarmModel } from '../models/farm.model';

export const FarmSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
}, schemaOptions);

export const Farm: Model<IFarmModel> = model<IFarmModel>('Farm', FarmSchema);
