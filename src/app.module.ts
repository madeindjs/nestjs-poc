import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        // host: configService.get('DATABASE_HOST'),
        // port: configService.get('DATABASE_PORT'),
        // username: configService.get('DATABASE_USER'),
        // password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        // entities: [],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
