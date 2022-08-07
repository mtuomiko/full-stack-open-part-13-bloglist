import { DataTypes } from 'sequelize';
import { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('reading_list_junction', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
  });

  await queryInterface.addConstraint('reading_list_junction', {
    fields: ['user_id', 'blog_id'],
    type: 'unique',
    name: 'user_id_blog_id_unique_contraint'
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('reading_list_junction');
};
