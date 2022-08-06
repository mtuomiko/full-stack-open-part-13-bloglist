import express from 'express';

import { getAll, create, remove, blogFinder, updateLikes } from '../controllers/blogs';
import { tokenExtractor } from '../util/middleware';

const router = express.Router();

router.get('/', getAll);

router.post('/', tokenExtractor, create);

router.delete('/:id', tokenExtractor, blogFinder, remove);

router.put('/:id', blogFinder, updateLikes);

export default router;
