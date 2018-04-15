import { Module } from '@nestjs/common';
import { HarvestController } from './harvest.controller';
import { HarvestService } from './harvest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HarvestSchema } from './schema/harvest.schema';
import { FarmModule } from '../farm/farm.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Harvest', schema: HarvestSchema }]), FarmModule],
  components: [
    HarvestService,
  ],
  controllers: [
    HarvestController,
  ],
  exports: [HarvestService],
})
export class HarvestModule {
}
