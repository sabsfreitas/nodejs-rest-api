import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelizeCon = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

async function connectDB() {
    try {
        await sequelizeCon.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB();

export { sequelizeCon };