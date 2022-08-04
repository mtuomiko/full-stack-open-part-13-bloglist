import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config';

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;
  declare author: string | null;
  declare url: string;
  declare title: string;
  declare likes: CreationOptional<number>;
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
    likes: DataTypes.INTEGER,
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
