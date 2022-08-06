import { Sequelize } from 'sequelize';
import { DB_URL } from './config';

let logging = true;

const customSequelizeLogger = (msg: string) => {
  if (logging) {
    console.log(msg);
  } else {
    return;
  }
};

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: customSequelizeLogger
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connected');
  } catch (error) {
    console.log('database connection failed');
    process.exit(1);
  }
};

const setLogging = (loggingValue: boolean) => {
  logging = loggingValue;
};

export {
  connectToDatabase,
  setLogging,
  sequelize,
};
