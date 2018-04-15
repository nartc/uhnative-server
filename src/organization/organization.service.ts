import { Component } from '@nestjs/common';
import { SharedService } from '../shared/shared.service';
import { IOrganizationModel, OrganizationParams, OrganizationType } from './models/organization.model';
import { InjectModel } from '@nestjs/mongoose';
import { Organization, OrganizationSchema } from './schema/organization.schema';
import { Model } from 'mongoose';

@Component()
export class OrganizationService extends SharedService<IOrganizationModel> {

  constructor(@InjectModel(OrganizationSchema) private readonly _organizationModel: Model<IOrganizationModel>) {
    super(_organizationModel);
  }

  async createOrganization(organizationParams: OrganizationParams): Promise<IOrganizationModel> {
    const newOrganization: IOrganizationModel = new Organization();
    newOrganization.name = organizationParams.name;
    newOrganization.orgType = OrganizationType[organizationParams.orgType];
    return this._organizationModel.create(newOrganization);
  }
}
