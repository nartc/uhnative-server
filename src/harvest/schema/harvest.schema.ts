import { model, Model, Schema } from 'mongoose';
import { FarmSchema } from '../../farm/schema/farm.schema';
import { EntrySchema } from '../../entry/schema/entry.schema';
import { schemaOptions } from '../../shared/models/shared.model';
import { IHarvestModel } from '../models/harvest.model';

export const HarvestSchema = new Schema({
  farm: FarmSchema,
  entries: [EntrySchema],
}, schemaOptions);

export const Harvest: Model<IHarvestModel> = model<IHarvestModel>('Harvest', HarvestSchema);