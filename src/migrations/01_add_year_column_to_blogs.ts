import { DataTypes } from 'sequelize';
import { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('blogs', 'year', DataTypes.INTEGER);
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('blogs', 'year');
};
