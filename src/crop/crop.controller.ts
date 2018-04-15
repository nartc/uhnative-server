import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropParams, CropVm, ICropModel } from './models/crop.model';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { ApiException } from '../shared/models/shared.model';

@Controller('crops')
@ApiUseTags('Crop')
export class CropController {

  constructor(private readonly _cropService: CropService) {

  }

  @Get()
  @ApiResponse({
    status: 200,
    type: CropVm,
    isArray: true,
    description: 'Get all Crops successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'GET All Crops',
    operationId: 'Crop_GetAllCrops',
  })
  async getAllCrops(): Promise<ICropModel[]> {
    return await this._cropService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: CropVm,
    description: 'Create new Crop successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'POST New Crop',
    operationId: 'Crop_CreateCrop',
  })
  async createCrop(@Body() cropParams: CropParams): Promise<ICropModel> {
    return await this._cropService.createFromBody(cropParams);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: CropVm,
    description: 'Get Crop by Id successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'GET Crop by Id',
    operationId: 'Crop_GetCropById',
  })
  async getCropById(@Param('id') id: string): Promise<ICropModel> {
    return await this._cropService.getById(id);
  }

  @Put()
  @ApiResponse({
    status: 200,
    type: CropVm,
    description: 'Update crop successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'PUT Crop',
    operationId: 'Crop_UpdateCrop',
  })
  async updateCrop(@Body() updatedCrop: CropVm): Promise<ICropModel> {
    return await this._cropService.updateFromBody(updatedCrop);
  }
}
