/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import { RequestHandler } from 'express';
import { Op } from 'sequelize';
import { Where } from 'sequelize/types/utils';

import { Blog, User } from '../models';
import { sequelize } from '../util/db';
import { toNewBlogRequest, toUpdateBlogRequest } from '../util/validation';

export const getAll: RequestHandler = async (req, res) => {
  // if no search param, clause will remain empty (can be passed onwards but doesn't cause any condition in query)
  let whereClause: { [Op.or]: Where[] } | Record<string, never> = {};

  // If search param present, use sequelize Wheres instead. Could have also used ILIKE operator since using PG.
  if (req.query.search) {
    const lowerCaseSearch = (req.query.search as string).toLowerCase(); // TODO: enforce stringness?
    whereClause = {
      [Op.or]: [
        createLowerCaseSubstringWhereClause('title', lowerCaseSearch),
        createLowerCaseSubstringWhereClause('author', lowerCaseSearch),
      ]
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'username', 'name'],
    },
    where: whereClause,
    order: [
      ['likes', 'DESC']
    ],
  });

  res.json(blogs);
};

const createLowerCaseSubstringWhereClause = (column: string, search: string) => {
  return sequelize.where(
    sequelize.fn('LOWER', sequelize.col(column)),
    { [Op.substring]: search }
  );
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
  // TODO: handle conversion errors or non-ints here
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

// Get all authors of blogs and for each get the number of blogs, total likes of all their blogs and order descending
// based on the likes.
export const getAllAuthors: RequestHandler = async (_req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    where: {
      author: { [Op.not]: null }
    },
    order: [
      sequelize.literal('likes DESC'), // a bit fragile (?) but works
    ],
  });

  res.json(authors);
};
