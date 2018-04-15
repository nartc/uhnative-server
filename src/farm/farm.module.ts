import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmSchema } from './schema/farm.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Farm', schema: FarmSchema }])],
  components: [
    FarmService,
  ],
  controllers: [
    FarmController,
  ],
  exports: [FarmService],
})
export class FarmModule {
}
