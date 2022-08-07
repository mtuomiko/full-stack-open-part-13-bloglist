import express from 'express';

import { getAll, create, userFinder, updateName, getOne } from '../controllers/users';

const router = express.Router();

router.get('/', getAll);

router.post('/', create);

router.put('/:username', userFinder, updateName);

router.get('/:id', getOne);

export default router;
