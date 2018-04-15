import { Module } from '@nestjs/common';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrySchema } from './schema/entry.schema';
import { CropModule } from '../crop/crop.module';
import { HarvesterModule } from '../harvester/harvester.module';
import { OrganizationModule } from '../organization/organization.module';
import { HarvestModule } from '../harvest/harvest.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }]),
    CropModule,
    HarvesterModule,
    OrganizationModule,
    HarvestModule,
  ],
  components: [
    EntryService,
  ],
  controllers: [
    EntryController,
  ],
})
export class EntryModule {
}
