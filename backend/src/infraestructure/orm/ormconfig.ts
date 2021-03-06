import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export = {
  type: 'postgres',
  host: process.env.DATABASE_URL || 'postgres',
  port: process.env.DB_PORT || 5000,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'localhost',
  synchronize: true,
  migrationsTableName: 'migration',
  entities: [
    'src/domain/model/**/*.ts',
  ],
  migrations: ['src/infraestructure/orm/migration/*.ts'],
  cli: {
    migrationsDir: 'src/infraestructure/orm/migration',
  },
  logging: false,
  ssl: process.env.SSL_CERT ? {
    ca: process.env.SSL_CERT,
  } : null,
  seeds: ['src/infraestructure/datastore/seeder/**/*{.ts,js}'],
  factories: ['src/infraestructure/datastore/factory/**/*{.ts,js}'],
} as ConnectionOptions;
