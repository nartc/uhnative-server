import { model, Model, Schema } from 'mongoose';
import { schemaOptions } from '../../shared/models/shared.model';
import { IUserModel } from '../models/user.model';

export const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
}, schemaOptions);

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);