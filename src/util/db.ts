// require('ts-node/register');

import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
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

const umzug = new Umzug({
  migrations: { glob: 'src/migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;

const runMigrations = async () => {
  const migrations = await umzug.up();
  console.log('Migrations up to date', {
    files: migrations.map(migration => migration.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  await umzug.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
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
  rollbackMigration,
  sequelize,
};
