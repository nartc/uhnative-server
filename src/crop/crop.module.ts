import { Module } from '@nestjs/common';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CropSchema } from './schema/crop.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Crop', schema: CropSchema }])],
  components: [
    CropService,
  ],
  controllers: [
    CropController,
  ],
  exports: [CropService],
})
export class CropModule {
}
