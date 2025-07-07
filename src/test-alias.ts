import { AppConfig } from './types';

const example: AppConfig = {
  port: 3000,
  jwt: {
    accessSecret: 'a',
    refreshSecret: 'b',
    expiresIn: '15m',
    refreshIn: '7d',
  },
  database: {
    postgres: {
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: '',
    },
    mongo: {
      uri: '',
      dbName: '',
    },
  },
  redis: {
    host: '',
    port: 6379,
    tls: false,
  },
};

console.log(example);
