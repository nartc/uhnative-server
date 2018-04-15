import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export interface IHarvesterModel extends ISharedModel {
  firstName?: string;
  lastName?: string;
  name?: string;
}

export class HarvesterVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  firstName?: string;
  @ApiModelPropertyOptional()
  lastName?: string;
  @ApiModelPropertyOptional()
  name?: string;
}

export class HarvesterParams {
  @ApiModelPropertyOptional()
  firstName?: string;
  @ApiModelPropertyOptional()
  lastName?: string;
}
