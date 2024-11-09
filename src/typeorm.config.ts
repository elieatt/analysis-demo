import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5450,
  username: 'postgres',
  password: 'postgres',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/entities/*{.js,.ts}'],
  migrations: [],
  subscribers: [],
});
