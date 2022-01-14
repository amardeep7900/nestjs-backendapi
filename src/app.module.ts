import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@sentry/types';
import { GraphQLModule } from '@nestjs/graphql';

import { PersonModule } from './graphql/person/person.module';
import {join} from 'path';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),

    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    ConfigModule,
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: cfg.get('SENTRY_DSN'),
        debug: cfg.get('SENTRY_DEBUG') == 'true',
        environment: cfg.get('SENTRY_ENVIRONMENT'),
        release: 'some_release',
        logLevel: LogLevel.Debug,
      }),
      inject: [ConfigService],
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
