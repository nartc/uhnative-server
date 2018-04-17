import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
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
    isArray: true,
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

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: FarmVm,
    description: 'Get Farm by Id successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'GET Farm by Id',
    operationId: 'Farm_GetById',
  })
  async getById(@Param('id') id: string): Promise<IFarmModel> {
    return await this._farmService.getById(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: FarmVm,
    description: 'Remove Farm by Id successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'DELETE Farm by Id',
    operationId: 'Farm_DeleteFarm',
  })
  async deleteFarm(@Param('id') id: string): Promise<IFarmModel> {
    const farm: IFarmModel = await this._farmService.getById(id);
    if (!farm || farm === null) {
      throw new HttpException('Farm not found', HttpStatus.NOT_FOUND);
    }

    return await this._farmService.delete(id);
  }
}
