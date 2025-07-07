import { AppConfig } from '@app-types';

const configuration = (): AppConfig => ({
  port: parseInt(process.env.PORT!, 10) || 3000,

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: '15m',
    refreshIn: '7d',
  },

  database: {
    postgres: {
      host: process.env.POSTGRES_HOST!,
      port: parseInt(process.env.POSTGRES_PORT!, 10),
      username: process.env.POSTGRES_USER!,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DB!,
    },
    mongo: {
      uri: process.env.MONGO_URI!,
      dbName: process.env.MONGO_DB_NAME ?? 'default_db',
    },
  },

  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!, 10),
    password: process.env.REDIS_PASSWORD,
    tls: process.env.REDIS_TLS === 'true',
  },
});

export default configuration;
