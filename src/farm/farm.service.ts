import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { IFarmModel } from './models/farm.model';
import { InjectModel } from '@nestjs/mongoose';
import { FarmSchema } from './schema/farm.schema';
import { Model } from 'mongoose';

@Component()
export class FarmService extends SharedService<IFarmModel> {

  constructor(@InjectModel(FarmSchema) private readonly _farmModel: Model<IFarmModel>) {
    super(_farmModel);
  }
}
