import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'bookhub_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false,
        define: { timestamps: true, underscored: true }
    }
);

export default sequelize;