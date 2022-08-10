import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, HasOneGetAssociationMixin, NonAttribute } from 'sequelize';
import { sequelize } from '../util/db';
import User from './user';

class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // mixins
  declare getUser: HasOneGetAssociationMixin<User>;
  declare user?: NonAttribute<User>;
}
Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'session',
    tableName: 'sessions',
    underscored: true,
  }
);

export default Session;
