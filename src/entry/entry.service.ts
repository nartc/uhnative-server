import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { EntryParams, IEntryModel } from './models/entry.model';
import { InjectModel } from '@nestjs/mongoose';
import { EntrySchema } from './schema/entry.schema';
import { Model } from 'mongoose';
import { CropService } from '../crop/crop.service';
import { OrganizationService } from '../organization/organization.service';
import { ICropModel } from '../crop/models/crop.model';
import { HarvesterService } from '../harvester/harvester.service';
import { IHarvesterModel } from '../harvester/models/harvester.model';
import { IOrganizationModel } from '../organization/models/organization.model';
import { IHarvestModel } from '../harvest/models/harvest.model';
import { HarvestService } from '../harvest/harvest.service';
import { indexOf } from 'lodash';

@Component()
export class EntryService extends SharedService<IEntryModel> {

  constructor(@InjectModel(EntrySchema) private readonly _entryModel: Model<IEntryModel>,
              private readonly _cropService: CropService,
              private readonly _harvesterService: HarvesterService,
              private readonly _organizationService: OrganizationService,
              private readonly _harvestService: HarvestService) {
    super(_entryModel);
  }

  async createEntry(entryParams: EntryParams, harvestId: string): Promise<IEntryModel> {
    const harvest: IHarvestModel = await this._harvestService.getById(harvestId);
    if (!harvest || harvest === null) {
      throw new HttpException('Harvest not found', HttpStatus.BAD_REQUEST);
    }

    const crop: ICropModel = await this._cropService.getById(entryParams.cropId);
    if (!crop || crop === null) {
      throw new HttpException('Crop not found', HttpStatus.BAD_REQUEST);
    }

    const harvester: IHarvesterModel = await this._harvesterService.getById(entryParams.harvesterId);
    if (!harvester || harvester === null) {
      throw new HttpException('Harvester not found', HttpStatus.BAD_REQUEST);
    }

    const recipient: IOrganizationModel = await this._organizationService.getById(entryParams.recipientId);
    if (!recipient || recipient === null) {
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    }

    const newEntry = {
      pounds: entryParams.pounds,
      comments: entryParams.comments,
      selectedVariety: entryParams.selectedVariety,
      priceTotal: entryParams.priceTotal,
      crop,
      harvester,
      recipient,
    };

    const entry: IEntryModel = await this._entryModel.create(newEntry);
    harvest.entries.push(entry);
    await harvest.save();

    return entry;
  }

  async updateEntry(harvestId: string, entryId: string, entryParams: EntryParams): Promise<IEntryModel> {
    const existedEntry: IEntryModel = await this._entryModel.findById(entryId).exec();
    if (!existedEntry || existedEntry === null) {
      throw new HttpException('Entry not found', HttpStatus.BAD_REQUEST);
    }

    const harvest: IHarvestModel = await this._harvestService.getById(harvestId);
    if (!harvest || harvest === null) {
      throw new HttpException('Harvest not found', HttpStatus.BAD_REQUEST);
    }

    const crop: ICropModel = await this._cropService.getById(entryParams.cropId);
    if (!crop || crop === null) {
      throw new HttpException('Crop not found', HttpStatus.BAD_REQUEST);
    }

    const harvester: IHarvesterModel = await this._harvesterService.getById(entryParams.harvesterId);
    if (!harvester || harvester === null) {
      throw new HttpException('Harvester not found', HttpStatus.BAD_REQUEST);
    }

    const recipient: IOrganizationModel = await this._organizationService.getById(entryParams.recipientId);
    if (!recipient || recipient === null) {
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);
    }

    existedEntry.crop = crop;
    existedEntry.harvester = harvester;
    existedEntry.recipient = recipient;
    existedEntry.pounds = entryParams.pounds;
    existedEntry.comments = entryParams.comments;
    existedEntry.selectedVariety = entryParams.selectedVariety;

    harvest.entries.splice(indexOf(harvest.entries, existedEntry), 1, existedEntry);
    await harvest.save();

    return this._entryModel.findByIdAndUpdate(entryId, existedEntry, { new: true }).exec();
  }
}
