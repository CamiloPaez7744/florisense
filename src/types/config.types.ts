export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  expiresIn: string;
  refreshIn: string;
}

export interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface MongoConfig {
  uri: string;
  dbName: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  tls?: boolean;
}

export interface AppConfig {
  port: number;
  jwt: JwtConfig;
  database: {
    postgres: PostgresConfig;
    mongo: MongoConfig;
  };
  redis: RedisConfig;
}
