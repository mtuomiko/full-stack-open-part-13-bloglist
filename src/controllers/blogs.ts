import { CreationAttributes } from 'sequelize/types';

import { Blog } from '../models';
import { UpdateBlogRequest } from '../types/requests';

export const getAll = async () => {
  const blogs = await Blog.findAll();

  return blogs;
};

export const create = async (blog: CreationAttributes<Blog>) => {
  const createdBlog = await Blog.create(blog);

  return createdBlog;
};

export const remove = async (blog: Blog) => {
  await blog.destroy();
};

export const getById = async (id: number) => {
  const blog = await Blog.findByPk(id);

  return blog;
};

export const updateLikes = async (blog: Blog, request: UpdateBlogRequest) => {
  const updatedBlog = await blog.update({ likes: request.likes });

  return updatedBlog;
};
