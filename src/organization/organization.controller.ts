import { Body, Controller, Get, HttpCode, Post, Put } from '@nestjs/common';
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
    return await this._organizationService.createFromBody(organizationParams);
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
}
