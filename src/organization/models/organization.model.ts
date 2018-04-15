import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export enum OrganizationType {
  Purchased = 'Purchased' as any,
  Donated = 'Donated' as any,
  Internal = 'Internal' as any,
}

export interface IOrganizationModel extends ISharedModel {
  name?: string;
  orgType?: OrganizationType;
}

export class OrganizationVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional({
    enum: ['Purchased', 'Donated', 'Internal'],
  })
  orgType?: OrganizationType;
}

export class OrganizationParams {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional({
    enum: ['Purchased', 'Donated', 'Internal'],
  })
  orgType?: OrganizationType;
}
