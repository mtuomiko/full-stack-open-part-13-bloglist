import express from 'express';

import { getAll, create, userFinder, updateName } from '../controllers/users';

const router = express.Router();

router.get('/', getAll);

router.post('/', create);

router.put('/:username', userFinder, updateName);

export default router;
