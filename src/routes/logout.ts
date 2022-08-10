import express from 'express';

import { logout } from '../controllers/auth';
import { tokenExtractor } from '../util/middleware';

const router = express.Router();

router.delete('/', tokenExtractor, logout);

export default router;
