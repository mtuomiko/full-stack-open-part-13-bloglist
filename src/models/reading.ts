import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../util/db';
import Blog from './blog';
import User from './user';

class Reading extends Model<InferAttributes<Reading>, InferCreationAttributes<Reading>> {
  declare id: CreationOptional<number>;
  declare read: CreationOptional<boolean>;
  declare userId: ForeignKey<User['id']>;
  declare blogId: ForeignKey<Blog['id']>;
}
Reading.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'reading',
    tableName: 'reading_list_junction',
    timestamps: false,
    underscored: true,
  }
);

export default Reading;
