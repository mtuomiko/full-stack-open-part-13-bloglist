/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import { RequestHandler } from 'express';

import { Blog, User } from '../models';
import { toNewBlogRequest, toUpdateBlogRequest } from '../util/validation';

export const getAll: RequestHandler = async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'username', 'name'],
    }
  });

  res.json(blogs);
};

export const create: RequestHandler = async (req, res) => {
  if (!req.verifiedToken) { throw { name: 'Unauthorized', message: 'token missing or invalid' }; }

  const user = await User.findByPk(req.verifiedToken.id);
  if (!user) { throw { name: 'Unauthorized', message: 'token missing or invalid' }; }

  const newBlogRequest = toNewBlogRequest(req.body);

  const newBlog = {
    ...newBlogRequest,
    userId: user.id
  };

  const createdBlog = await Blog.create(newBlog);

  return res.json(createdBlog);
};

/*
  Not handling blog not found errors here since we don't type safely guarantee a Blog will exist in the Request,
  meaning any route handler using blogFinder will still need to verify the existance
*/
export const blogFinder: RequestHandler = async (req, _res, next) => {
  // not handling conversion errors or non-ints here
  const id = Number(req.params.id);
  const blog = await Blog.findByPk(id);

  if (blog) { req.blog = blog; }

  next();
};

export const remove: RequestHandler = async (req, res) => {
  if (!req.blog) { throw { name: 'NotFound' }; }
  if (!req.verifiedToken) { throw { name: 'Unauthorized', message: 'token missing or invalid' }; }

  if (req.blog.userId !== req.verifiedToken.id) { throw { name: 'Forbidden', message: "not allowed to remove other user's blogs" }; }

  await req.blog.destroy();

  res.status(204).send();
};

export const updateLikes: RequestHandler = async (req, res) => {
  if (!req.blog) { throw { name: 'NotFound' }; }

  const updateRequest = toUpdateBlogRequest(req.body);
  const updatedBlog = await req.blog.update({ likes: updateRequest.likes });

  res.json(updatedBlog);
};
