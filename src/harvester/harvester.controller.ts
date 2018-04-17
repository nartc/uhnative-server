import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { HarvesterService } from './harvester.service';
import { HarvesterParams, HarvesterVm, IHarvesterModel } from './models/harvester.model';
import { ApiException } from '../shared/models/shared.model';

@Controller('harvesters')
@ApiUseTags('Harvester')
export class HarvesterController {

  constructor(private readonly _harvesterService: HarvesterService) {
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: HarvesterVm,
    isArray: true,
    description: 'Get all Harvesters successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'GET all Harvesters',
    operationId: 'Harvester_GetAllHarvesters',
  })
  async getAllHarvesters(): Promise<IHarvesterModel[]> {
    return await this._harvesterService.getAll();
  }

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: HarvesterVm,
    description: 'Register new Harvester successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'POST new Harvester',
    operationId: 'Harvester_RegisterHarvester',
  })
  async registerHarvester(@Body() harvesterParams: HarvesterParams): Promise<IHarvesterModel> {
    return await this._harvesterService.createFromBody(harvesterParams);
  }

  @Put()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: HarvesterVm,
    description: 'Update Harvester successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'PUT Harvester',
    operationId: 'Harvester_UpdateHarvester',
  })
  async updateHarvester(@Body() updatedHarvester: HarvesterVm): Promise<IHarvesterModel> {
    return await this._harvesterService.updateFromBody(updatedHarvester);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: HarvesterVm,
    description: 'Get Harvester by Id successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'GET Harvester by Id',
    operationId: 'Harvester_GetById',
  })
  async getById(@Param('id') id: string): Promise<IHarvesterModel> {
    return await this._harvesterService.getById(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: HarvesterVm,
    description: 'Remove Harvester by Id successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'DELETE Harvester by Id',
    operationId: 'Harvester_DeleteHarvester',
  })
  async deleteHarvester(@Param('id') id: string): Promise<IHarvesterModel> {
    const harvester: IHarvesterModel = await this._harvesterService.getById(id);
    if (!harvester || harvester === null) {
      throw new HttpException('Harvester not found', HttpStatus.NOT_FOUND);
    }

    return await this._harvesterService.delete(id);
  }
}
