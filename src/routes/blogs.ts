/* eslint-disable @typescript-eslint/no-misused-promises */
/* something with express v4 and handler promises */

import express from 'express';
import { CreationAttributes } from 'sequelize/types';
import { getAll, create, remove } from '../controllers/blogs';
import { Blog } from '../models';

const router = express.Router();

router.get('/', async (_req, res) => {
  const blogs = await getAll();

  res.json(blogs);
});

router.post('/', async (req, res) => {
  try {
    // not checking anything from the body, assume it has the needed data
    const blog = await create(req.body as CreationAttributes<Blog>);

    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // not handling conversion errors
    await remove(Number(req.params.id));

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
