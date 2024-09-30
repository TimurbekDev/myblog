import { appConfig, dbConfig } from '@config';
import { Article, ArticleModule, User, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('dbConfig.host'),
        port: config.get<number>('dbConfig.port'),
        username: config.get<string>('dbConfig.user'),
        password: config.get<string>('dbConfig.password'),
        database: config.get<string>('dbConfig.dbName'),
        autoLoadModels: true,
        synchronize: true,
        models: [User,Article],
        logging: false,
        sync: {
          alter: true,
          force: false
        }
      }),
    }),
    UserModule,
    ArticleModule
  ],
  controllers: [],
  providers: [
    // {
    //   provide : APP_PIPE,
    //   useClass: ValidationPipe
    // }
  ],
})
export class AppModule { }
