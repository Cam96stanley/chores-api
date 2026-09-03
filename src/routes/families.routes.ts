import { Router } from 'express';
import {
    createFamily,
    deleteFamily,
    getFamilies,
    getFamily,
    updateFamily,
} from '../controllers/families.controller.js';
import {
    createFamiliesSchema,
    updateFamiliesSchema,
} from '../db/schema/families.validation.js';
import handleAsync from '../lib/handleAsync.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', validate(createFamiliesSchema), handleAsync(createFamily));
router.get('/', handleAsync(getFamilies));
router.get('/:id', handleAsync(getFamily));
router.patch('/:id', validate(updateFamiliesSchema), handleAsync(updateFamily));
router.delete('/:id', handleAsync(deleteFamily));

export default router;
