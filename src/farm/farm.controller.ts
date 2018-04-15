import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FarmService } from './farm.service';
import { ApiException } from '../shared/models/shared.model';
import { FarmParams, FarmVm, IFarmModel } from './models/farm.model';

@Controller('farms')
@ApiUseTags('Farm')
export class FarmController {

  constructor(private readonly _farmService: FarmService) {
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: FarmVm,
    description: 'Get all Farms successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'GET all Farms',
    operationId: 'Farm_GetAllFarms',
  })
  async getAllFarms(): Promise<IFarmModel[]> {
    return await this._farmService.getAll();
  }

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: FarmVm,
    description: 'Register new Farm successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'POST new Farm',
    operationId: 'Farm_RegisterFarm',
  })
  async registerFarm(@Body() farmParams: FarmParams): Promise<IFarmModel> {
    return await this._farmService.createFromBody(farmParams);
  }

  @Put()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: FarmVm,
    description: 'Update Farm successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'PUT Farm',
    operationId: 'Farm_UpdateFarm',
  })
  async updateFarm(@Body() updatedFarm: FarmVm): Promise<IFarmModel> {
    return await this._farmService.updateFromBody(updatedFarm);
  }
}
