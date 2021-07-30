import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GithubModule } from './github/github.module';
import { HashModule } from './hash/hash.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { GithubUserModule } from './github-user/github-user.module';

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
        database: configService.get('DATABASE_DB'),
        entities: [User],
        synchronize: true,
        logging: true,
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UsersModule,
    HashModule,
    AuthModule,
    PasswordResetModule,
    GithubModule,
    GithubUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
