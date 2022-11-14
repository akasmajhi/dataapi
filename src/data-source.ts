import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "drill_001",
    entities: ["build/database/entities/**/*.js"],
    synchronize: true,
    // logging: true,
    logging: false,
});
