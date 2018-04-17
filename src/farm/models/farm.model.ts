import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export interface IFarmModel extends ISharedModel {
  name?: string;
  lat?: number;
  lng?: number;
}

export class FarmVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  lat?: number;
  @ApiModelPropertyOptional()
  lng?: number;
}

export class FarmParams {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  lat?: number;
  @ApiModelPropertyOptional()
  lng?: number;
}
