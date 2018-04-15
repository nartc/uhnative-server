import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { CropVm, ICropModel } from '../../crop/models/crop.model';
import { HarvesterVm, IHarvesterModel } from '../../harvester/models/harvester.model';
import { IOrganizationModel, OrganizationVm } from '../../organization/models/organization.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export interface IEntryModel extends ISharedModel {
  pounds?: number;
  comments?: string;
  selectedVariety?: string;
  crop?: ICropModel;
  harvester?: IHarvesterModel;
  recipient?: IOrganizationModel;
}

export class EntryVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  pounds?: number;
  @ApiModelPropertyOptional()
  comments?: string;
  @ApiModelPropertyOptional()
  selectedVariety?: string;
  @ApiModelPropertyOptional({
    type: CropVm,
  })
  crop?: CropVm;
  @ApiModelPropertyOptional({
    type: HarvesterVm,
  })
  harvester?: HarvesterVm;
  @ApiModelPropertyOptional({
    type: OrganizationVm,
  })
  recipient?: OrganizationVm;
}

export class EntryParams {
  @ApiModelProperty()
  pounds: number;
  @ApiModelPropertyOptional()
  cropId?: string;
  @ApiModelPropertyOptional()
  harvesterId?: string;
  @ApiModelPropertyOptional()
  comments?: string;
  @ApiModelPropertyOptional()
  recipientId?: string;
  @ApiModelPropertyOptional()
  selectedVariety?: string;
}