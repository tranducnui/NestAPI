import { DataSourceOptions, DataSource } from 'typeorm';
export const dataSourceOptions: DataSourceOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '22082001',
    database: 'NestAPI',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js']
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource;