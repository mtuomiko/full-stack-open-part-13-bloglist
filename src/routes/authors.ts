import express from 'express';
import { getAllAuthors } from '../controllers/blogs';

const router = express.Router();

router.get('/', getAllAuthors);

export default router;
