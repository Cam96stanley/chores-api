import type { Request, Response } from 'express';
import type { CreateFamilyMemberInput } from '../db/schema/familyMembers.validation.js';
import { createFamilyMemberService } from '../services/familyMembers.service.js';

export const createFamilyMember = async (
    req: Request<{ familyId: string }, unknown, CreateFamilyMemberInput>,
    res: Response,
) => {
    const familyMember = await createFamilyMemberService({
        ...req.body,
        familyId: req.params.familyId,
    });

    return res.status(201).json(familyMember);
};
