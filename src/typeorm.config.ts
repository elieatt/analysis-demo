import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config({ path: '.env.dev' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/entities/*{.js,.ts}'],
  migrations: [],
  subscribers: [],
});
