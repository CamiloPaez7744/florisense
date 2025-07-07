import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@app-types';

import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbRaw = configService.get('database');

        if (!dbRaw) {
          throw new Error('Missing database configuration');
        }

        const dbConfig = dbRaw as AppConfig['database'];
        return {
          type: 'postgres',
          host: dbConfig.postgres.host,
          port: dbConfig.postgres.port,
          username: dbConfig.postgres.username,
          password: dbConfig.postgres.password,
          database: dbConfig.postgres.database,
          entities: [join(process.cwd(), 'dist', '**', '*.entity.{js,ts}')],
          synchronize: true,
        };
      },
    }),
  ],
})
export class PostgresDatabaseModule {}
