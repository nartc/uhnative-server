import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { HarvestService } from './harvest.service';
import { HarvestVm, IHarvestModel } from './models/harvest.model';
import { ApiException } from '../shared/models/shared.model';

@Controller('harvests')
@ApiUseTags('Harvest')
export class HarvestController {

  constructor(private readonly _harvestService: HarvestService) {
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get Harvest by Id successfully',
    type: HarvestVm,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'GET Harvest by Id',
    operationId: 'Harvest_GetById',
  })
  async getById(@Param('id') id: string): Promise<IHarvestModel> {
    const harvest: IHarvestModel = await this._harvestService.getById(id);
    if (!harvest || harvest === null) {
      throw new HttpException('Harvest not found', HttpStatus.BAD_REQUEST);
    }

    return harvest;
  }

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Initialize Harvest successfully',
    type: HarvestVm,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'POST Harvest',
    operationId: 'Harvest_InitializeHarvest',
  })
  async initializeHarvest(@Query('farmId') farmId: string): Promise<IHarvestModel> {
    return await this._harvestService.initializeHarvest(farmId);
  }
}
