/* eslint-disable @typescript-eslint/no-misused-promises */
/* some issue with express v4 and handler promises */

import express, { RequestHandler } from 'express';

import { getAll, create, remove, getById, updateLikes } from '../controllers/blogs';
import { toNewBlogRequest, toUpdateBlogRequest } from '../util/validation';

const router = express.Router();

router.get('/', async (_req, res) => {
  const blogs = await getAll();

  res.json(blogs);
});

router.post('/', async (req, res) => {
  const newBlog = toNewBlogRequest(req.body);
  const addedBlog = await create(newBlog);

  res.json(addedBlog);
});

/*
  Not handling blog not found errors here since we don't type safely guarantee a Blog will exist in the Request,
  meaning any route handler using blogFinder will still need to verify the existance
*/
const blogFinder: RequestHandler = async (req, _res, next) => {
  // not handling conversion errors or non-ints here
  const id = Number(req.params.id);
  const blog = await getById(id);

  if (blog) { req.blog = blog; }

  next();
};

router.delete('/:id', blogFinder, async (req, res) => {
  if (!req.blog) { throw { name: 'NotFound' }; }

  await remove(req.blog);

  res.status(204).send();
});

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.blog) { throw { name: 'NotFound' }; }

  const updateRequest = toUpdateBlogRequest(req.body);
  const updatedBlog = await updateLikes(req.blog, updateRequest);

  res.json(updatedBlog);
});

export default router;
