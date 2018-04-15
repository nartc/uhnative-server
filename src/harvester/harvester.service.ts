import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { IHarvesterModel } from './models/harvester.model';
import { InjectModel } from '@nestjs/mongoose';
import { HarvesterSchema } from './schema/harvester.schema';
import { Model } from 'mongoose';

@Component()
export class HarvesterService extends SharedService<IHarvesterModel> {

  constructor(@InjectModel(HarvesterSchema) private readonly _harvesterModel: Model<IHarvesterModel>) {
    super(_harvesterModel);
  }
}
