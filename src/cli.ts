import 'dotenv/config';
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
});

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

const main = async () => {
  try {
    await sequelize.authenticate();

    const allBlogs = await Blog.findAll();
    allBlogs.forEach(blog => {
      const authorText = blog.author ? `${blog.author}: ` : '';
      console.log(`${authorText}${blog.title}, ${blog.likes} likes`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

void main();
