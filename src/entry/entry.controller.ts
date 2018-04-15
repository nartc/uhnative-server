import { Body, Controller, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { EntryService } from './entry.service';
import { EntryParams, EntryVm, IEntryModel } from './models/entry.model';
import { ApiException } from '../shared/models/shared.model';

@Controller('entries')
@ApiUseTags('Entry')
export class EntryController {

  constructor(private readonly _entryService: EntryService) {
  }

  @Post('create')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Create Entry successfully',
    type: EntryVm,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'POST new Entry',
    operationId: 'Entry_CreateEntry',
  })
  async createEntry(@Body() entryParams: EntryParams): Promise<IEntryModel> {
    return await this._entryService.createEntry(entryParams);
  }

  @Put('update/:id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Update Entry successfully',
    type: EntryVm,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ApiException,
  })
  @ApiOperation({
    title: 'PUT Entry',
    operationId: 'Entry_UpdateEntry',
  })
  async updateEntry(@Body() entryParams: EntryParams, @Param('id') id: string, @Query('harvestId') harvestId: string): Promise<IEntryModel> {
    return await this._entryService.updateEntry(harvestId, id, entryParams);
  }
}
