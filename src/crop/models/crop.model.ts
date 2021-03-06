import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export interface ICropModel extends ISharedModel {
  name?: string;
  variety?: string[];
  pricePerPound?: number;
}

export class CropVm extends SharedModelVm {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional({
    type: String,
    isArray: true,
  })
  variety?: string[];
  @ApiModelPropertyOptional()
  pricePerPound?: number;
}

export class CropParams {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  variety?: string;
  @ApiModelPropertyOptional()
  pricePerPound?: number;
}
