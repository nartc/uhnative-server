import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { ICropModel } from './models/crop.model';
import { InjectModel } from '@nestjs/mongoose';
import { CropSchema } from './schema/crop.schema';
import { Model } from 'mongoose';

@Component()
export class CropService extends SharedService<ICropModel> {

  constructor(@InjectModel(CropSchema) private readonly _cropModel: Model<ICropModel>) {
    super(_cropModel);
  }
}
