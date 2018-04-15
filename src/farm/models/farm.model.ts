import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export interface IFarmModel extends ISharedModel {
  name?: string;
  lat?: string;
  lng?: string;
}

export class FarmVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  lat?: string;
  @ApiModelPropertyOptional()
  lng?: string;
}

export class FarmParams {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  lat?: string;
  @ApiModelPropertyOptional()
  lng?: string;
}
