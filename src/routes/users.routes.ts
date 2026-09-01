// src/routes/users.routes.ts
import { Router } from 'express';
import validate from '../middleware/validate.js';
import { createUserSchema } from '../db/schema/users.validation.js';
import handleAsync from '../lib/handleAsync.js';
import { createUser } from '../controllers/users.controller.js';

const router = Router();

router.post('/', validate(createUserSchema), handleAsync(createUser));

export default router;