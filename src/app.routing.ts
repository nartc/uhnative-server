import { Routes } from 'nest-router';
import { UserModule } from './user/user.module';
import { CropModule } from './crop/crop.module';
import { EntryModule } from './entry/entry.module';
import { FarmModule } from './farm/farm.module';
import { HarvestModule } from './harvest/harvest.module';
import { HarvesterModule } from './harvester/harvester.module';
import { OrganizationModule } from './organization/organization.module';

export const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/',
        module: UserModule,
      },
      {
        path: '/',
        module: CropModule,
      },
      {
        path: '/',
        module: EntryModule,
      },
      {
        path: '/',
        module: FarmModule,
      },
      {
        path: '/',
        module: HarvestModule,
      },
      {
        path: '/',
        module: HarvesterModule,
      },
      {
        path: '/',
        module: OrganizationModule,
      },
    ],
  },
];