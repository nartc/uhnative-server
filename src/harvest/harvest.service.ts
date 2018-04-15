import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { IHarvestModel } from './models/harvest.model';
import { InjectModel } from '@nestjs/mongoose';
import { HarvestSchema } from './schema/harvest.schema';
import { Model } from 'mongoose';
import { FarmService } from '../farm/farm.service';
import { IFarmModel } from '../farm/models/farm.model';

@Component()
export class HarvestService extends SharedService<IHarvestModel> {

  constructor(@InjectModel(HarvestSchema) private readonly _harvestModel: Model<IHarvestModel>,
              private readonly _farmService: FarmService) {
    super(_harvestModel);
  }

  async initializeHarvest(farmId: string): Promise<IHarvestModel> {
    const farm: IFarmModel = await this._farmService.getById(farmId);
    if (!farm || farm === null) {
      throw new HttpException('Farm not found', HttpStatus.BAD_REQUEST);
    }

    const newHarvest = {
      farm,
      entries: [],
    };

    return this._harvestModel.create(newHarvest);
  }
}
