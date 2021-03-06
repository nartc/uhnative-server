import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { get } from 'config';

const port = process.env.PORT || get('express.port');
const environmentHosting = process.env.NODE_ENV || 'Development';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, { cors: true });
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Urban Harvest STL')
    .setDescription('Urban Harvest API Documentation')
    .setVersion('1.0.0')
    .addTag('Authentication', 'Authentication APIs')
    .addTag('Crop', 'Crop APIs')
    .addTag('Entry', 'Entry APIs')
    .addTag('Farm', 'Farm APIs')
    .addTag('Harvest', 'Harvest APIs')
    .addTag('Harvester', 'Harvester APIs')
    .addTag('Organization', 'Organization APIs')
    .addBearerAuth()
    .setBasePath('/api')
    .setSchemes('http', 'https')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  app.use('/api/docs/swagger.json', (req: Request, res: Response) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('/api/docs', app, null, {
    explorer: true,
    customSiteTitle: 'UHSTL API Documentation',
    swaggerUrl: environmentHosting === 'Development'
      ? `${get('express.host_name')}/api/docs/swagger.json`
      : `${process.env.HOST}/api/docs/swagger.json`,
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(port);
}

bootstrap();
