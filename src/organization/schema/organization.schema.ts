import { model, Model, Schema } from 'mongoose';
import { schemaOptions } from '../../shared/models/shared.model';
import { IOrganizationModel } from '../models/organization.model';

export const OrganizationSchema = new Schema({
  name: String,
  orgType: {
    type: String,
    enum: ['Purchased', 'Donated', 'Internal'],
    default: 'Internal',
  },
}, schemaOptions);

export const Organization: Model<IOrganizationModel> = model<IOrganizationModel>('Organization', OrganizationSchema);
