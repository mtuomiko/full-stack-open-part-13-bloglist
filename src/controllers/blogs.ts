import { CreationAttributes } from 'sequelize/types';
import { Blog } from '../models';

export const getAll = async () => {
  const blogs = await Blog.findAll();

  return blogs;
};

export const create = async (blog: CreationAttributes<Blog>) => {
  const createdBlog = await Blog.create(blog);

  return createdBlog;
};

export const remove = async (id: number) => {
  await Blog.destroy({
    where: {
      id
    }
  });
};
