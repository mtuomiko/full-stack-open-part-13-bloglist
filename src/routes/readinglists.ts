import express from 'express';
import { create, updateRead } from '../controllers/readings';
import { tokenExtractor } from '../util/middleware';

const router = express.Router();

router.post('/', create);

router.put('/:id', tokenExtractor, updateRead);

export default router;
