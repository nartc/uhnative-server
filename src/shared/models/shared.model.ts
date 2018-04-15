import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Document, SchemaOptions } from 'mongoose';

export interface ISharedModel extends Document {
  createdAt?: Date;
  updatedAt?: Date;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
};

export class SharedModelVm {
  @ApiModelPropertyOptional({
    type: String,
    format: 'date-time',
  })
  createdAt?: Date;
  @ApiModelPropertyOptional({
    type: String,
    format: 'date-time',
  })
  updatedAt?: Date;
  @ApiModelPropertyOptional()
  _id?: string;
}

export class ApiException {
  @ApiModelPropertyOptional() statusCode?: number;
  @ApiModelPropertyOptional() message?: string;
}
