import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan'
import { ValidationPipe } from '@nestjs/common';

async function startApp() {
  const app = await NestFactory.create(AppModule,
    { });

  const configService = app.get(ConfigService)

  if (process.env.NODE_env.trim() == 'development') {
    app.use(morgan('tiny'))
  }

  app.setGlobalPrefix('/api/v1')

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(
    configService.get<number>('appConfig.port'),
    configService.get<string>('appConfig.host'),
    () => {
      console.log('Server running on port : ',
        configService.get<number>('appConfig.port')
      )
    }
  );
}

startApp();
