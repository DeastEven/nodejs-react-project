import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(
    'online_store',
    'admin',
    'root',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
)