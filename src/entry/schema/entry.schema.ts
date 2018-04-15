import { model, Model, Schema } from 'mongoose';
import { CropSchema } from '../../crop/schema/crop.schema';
import { HarvesterSchema } from '../../harvester/schema/harvester.schema';
import { OrganizationSchema } from '../../organization/schema/organization.schema';
import { schemaOptions } from '../../shared/models/shared.model';
import { IEntryModel } from '../models/entry.model';

export const EntrySchema = new Schema({
  crop: CropSchema,
  pounds: Number,
  harvester: HarvesterSchema,
  comments: String,
  recipient: OrganizationSchema,
  selectedVariety: String,
}, schemaOptions);

export const Entry: Model<IEntryModel> = model<IEntryModel>('Entry', EntrySchema);
