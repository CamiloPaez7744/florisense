import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@app-types';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig>) => {
        const dbRaw = configService.get('database');

        if (!dbRaw) {
          throw new Error('Missing database configuration');
        }

        const dbConfig = dbRaw as AppConfig['database'];

        return {
          uri: dbConfig.mongo.uri,
          dbName: dbConfig.mongo.dbName,
        };
      },
    }),
  ],
})
export class MongoDatabaseModule {}
