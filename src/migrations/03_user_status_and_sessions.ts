import { DataTypes } from 'sequelize';
import { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'enabled', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  });

  await queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('sessions');
  await queryInterface.removeColumn('users', 'enabled');
};
