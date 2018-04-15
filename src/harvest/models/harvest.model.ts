import { ISharedModel, SharedModelVm } from '../../shared/models/shared.model';
import { FarmVm, IFarmModel } from '../../farm/models/farm.model';
import { EntryVm, IEntryModel } from '../../entry/models/entry.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export interface IHarvestModel extends ISharedModel {
  farm?: IFarmModel;
  entries?: IEntryModel[];
}

export class HarvestVm extends SharedModelVm {
  @ApiModelPropertyOptional({
    type: FarmVm,
  })
  farm?: FarmVm;
  @ApiModelPropertyOptional({
    type: EntryVm,
    isArray: true,
  })
  entries?: EntryVm[];
}
