import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from '../controllers/users.controller.js';
import { createUserSchema } from '../db/schema/users.validation.js';
import handleAsync from '../lib/handleAsync.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', validate(createUserSchema), handleAsync(createUser));
router.get('/', handleAsync(getUsers));
router.get('/:id', handleAsync(getUser));
router.patch('/:id', handleAsync(updateUser));
router.delete('/:id', handleAsync(deleteUser));

export default router;
