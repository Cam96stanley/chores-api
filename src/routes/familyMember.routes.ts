import { Router } from 'express';
import { createFamilyMember } from '../controllers/familyMembers.controller.js';
import { createFamilyMemberSchema } from '../db/schema/familyMembers.validation.js';
import handleAsync from '../lib/handleAsync.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post(
    '/',
    validate(createFamilyMemberSchema),
    handleAsync(createFamilyMember),
);

export default router;
