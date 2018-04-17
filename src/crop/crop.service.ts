import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { CropParams, ICropModel } from './models/crop.model';
import { InjectModel } from '@nestjs/mongoose';
import { Crop, CropSchema } from './schema/crop.schema';
import { Model } from 'mongoose';

@Component()
export class CropService extends SharedService<ICropModel> {

  constructor(@InjectModel(CropSchema) private readonly _cropModel: Model<ICropModel>) {
    super(_cropModel);
  }

  async createCrop(cropParams: CropParams): Promise<ICropModel> {
    const newCrop: ICropModel = new Crop();
    newCrop.name = cropParams.name;
    newCrop.pricePerPound = cropParams.pricePerPound;
    newCrop.variety = cropParams.variety.split('\n');
    return this._cropModel.create(newCrop);
  }
}
