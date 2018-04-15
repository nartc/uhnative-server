import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './schema/organization.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }])],
  components: [
    OrganizationService,
  ],
  controllers: [
    OrganizationController,
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {
}
