import type { Request, Response } from 'express';
import type { UpdateFamilyInput } from '../db/schema/families.validation.js';
import type { CreateUserInput } from '../db/schema/users.validation.js';
import {
    createFamilyService,
    deleteFamilyService,
    getFamiliesService,
    getFamilyService,
    updateFamilyService,
} from '../services/families.service.js';

export const createFamily = async (
    req: Request<Record<string, string>, unknown, CreateUserInput>,
    res: Response,
) => {
    const { name } = req.body;

    const family = await createFamilyService({ name });
    return res.status(201).json({ family });
};

export const getFamilies = async (_req: Request, res: Response) => {
    const families = await getFamiliesService();
    return res.status(200).json({ families });
};

export const getFamily = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const id = req.params.id;
    const family = await getFamilyService(id);
    return res.status(200).json({ family });
};

export const updateFamily = async (
    req: Request<Record<string, string>, unknown, UpdateFamilyInput>,
    res: Response,
) => {
    const id = req.params.id;
    const body = req.body;
    const updatedFamily = await updateFamilyService(id, body);

    if (!updatedFamily) {
        return res.status(404).json({ error: 'Family not found' });
    }

    return res.status(200).json({ updatedFamily });
};

export const deleteFamily = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const id = req.params.id;
    const _deletedFamily = await deleteFamilyService(id);

    if (!deleteFamily) {
        return res.status(404).json({ error: 'Family not found' });
    }

    return res.status(204).send();
};
