import 'dotenv/config';
import { Sequelize } from 'sequelize';

let logging = true;

const customSequelizeLogger = (msg: string) => {
  if (logging) {
    console.log(msg);
  } else {
    return;
  }
};

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: customSequelizeLogger
});

export const setLogging = (loggingValue: boolean) => {
  logging = loggingValue;
};

export default sequelize;
