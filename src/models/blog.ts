import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { sequelize } from '../util/db';
import User from './user';

const minimumYear = 1991;

const validateYear = (value: unknown) => {
  const currentYear = new Date().getFullYear();
  if (Number.isInteger(value)) {
    const year = value as number;
    if (year >= minimumYear && year <= currentYear) { return; }
  }

  throw new Error(`year must be an integer, and between ${minimumYear} and current year ${currentYear}`);
};


class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;
  declare author: string | null;
  declare url: string;
  declare title: string;
  declare likes: CreationOptional<number>;
  declare year: number | null;
  declare userId: ForeignKey<User['id']>;
}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: DataTypes.TEXT,
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      // feels weird to validate this at the DB/ORM level but seems like the task was after this kind of a solution
      validate: {
        validateYear
      }
    }
  },
  {
    sequelize,
    modelName: 'blog',
    tableName: 'blogs',
    timestamps: false,
    underscored: true,
  }
);

export default Blog;
