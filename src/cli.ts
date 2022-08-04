import sequelize, { setLogging } from './config';
import { Blog } from './models';

const main = async () => {
  try {
    setLogging(false);
    await sequelize.authenticate();

    const allBlogs = await Blog.findAll({ logging: false });
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
