import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { OrganizationService } from './organization.service';
import { IOrganizationModel, OrganizationParams, OrganizationVm } from './models/organization.model';
import { ApiException } from '../shared/models/shared.model';

@Controller('organizations')
@ApiUseTags('Organization')
export class OrganizationController {

  constructor(private readonly _organizationService: OrganizationService) {

  }

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: OrganizationVm,
    description: 'Register new Organization successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'POST new Organization',
    operationId: 'Organization_RegisterOrganization',
  })
  async registerOrganization(@Body() organizationParams: OrganizationParams): Promise<IOrganizationModel> {
    if (!organizationParams.name || !organizationParams.orgType) {
      throw new HttpException('Invalid request parameters', HttpStatus.BAD_REQUEST);
    }
    return await this._organizationService.createOrganization(organizationParams);
  }

  @Put()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: OrganizationVm,
    description: 'Update Organization successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'PUT Organization',
    operationId: 'Organization_UpdateOrganization',
  })
  async updateOrganization(@Body() updatedOrganization: OrganizationVm): Promise<IOrganizationModel> {
    return await this._organizationService.updateFromBody(updatedOrganization);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: OrganizationVm,
    isArray: true,
    description: 'Get all Organizations successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'GET all Organizations',
    operationId: 'Organization_GetAllOrganizations',
  })
  async getAllOrganizations(): Promise<IOrganizationModel[]> {
    return await this._organizationService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: OrganizationVm,
    description: 'Get Organization by Id successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'GET Organization by Id',
    operationId: 'Organization_GetById',
  })
  async getById(@Param('id') id: string): Promise<IOrganizationModel> {
    return await this._organizationService.getById(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: OrganizationVm,
    description: 'Remove Organization by Id successfully',
  })
  @ApiResponse({
    status: 400,
    type: ApiException,
    description: 'Bad Request',
  })
  @ApiOperation({
    title: 'DELETE Organization by Id',
    operationId: 'Organization_DeleteOrganization',
  })
  async deleteOrganization(@Param('id') id: string): Promise<IOrganizationModel> {
    const organization: IOrganizationModel = await this._organizationService.getById(id);
    if (!organization || organization === null) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return await this._organizationService.delete(id);
  }
}
