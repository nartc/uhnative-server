import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CropModule } from './crop/crop.module';
import { EntryModule } from './entry/entry.module';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';
import { HarvesterModule } from './harvester/harvester.module';
import { OrganizationModule } from './organization/organization.module';
import { RouterModule } from 'nest-router';
import { routes } from './app.routing';
import { MongooseModule } from '@nestjs/mongoose';
import { get } from 'config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || get('mongo.connection_string')),
    RouterModule.forRoutes(routes),
    UserModule,
    AuthModule,
    CropModule,
    EntryModule,
    FarmModule,
    HarvestModule,
    HarvesterModule,
    OrganizationModule,
  ],
  components: [],
})
export class ApplicationModule {
}
