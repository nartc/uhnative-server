import { Module } from '@nestjs/common';
import { HarvesterController } from './harvester.controller';
import { HarvesterService } from './harvester.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HarvesterSchema } from './schema/harvester.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Harvester', schema: HarvesterSchema }])],
  components: [
    HarvesterService,
  ],
  controllers: [
    HarvesterController,
  ],
  exports: [HarvesterService],
})
export class HarvesterModule {
}
