import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { IOrganizationModel } from './models/organization.model';
import { InjectModel } from '@nestjs/mongoose';
import { OrganizationSchema } from './schema/organization.schema';
import { Model } from 'mongoose';

@Component()
export class OrganizationService extends SharedService<IOrganizationModel> {

  constructor(@InjectModel(OrganizationSchema) private readonly _organizationModel: Model<IOrganizationModel>) {
    super(_organizationModel);
  }
}
