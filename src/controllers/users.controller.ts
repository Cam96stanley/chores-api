import type { Request, Response } from 'express';
import type {
    CreateUserInput,
    UpdateUserInput,
} from '../db/schema/users.validation.js';
import {
    createUserService,
    deleteUserService,
    getUserService,
    getUsersService,
    updateUserService,
} from '../services/users.service.js';

export const createUser = async (
    req: Request<Record<string, string>, unknown, CreateUserInput>,
    res: Response,
) => {
    const { name, email, password } = req.body;
    const user = await createUserService({ name, email, password });
    res.status(201).json({ user });
};

export const getUsers = async (_req: Request, res: Response) => {
    const users = await getUsersService();
    res.status(200).json({ users });
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const user = await getUserService(id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
};

export const updateUser = async (
    req: Request<{ id: string }, unknown, UpdateUserInput>,
    res: Response,
) => {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await updateUserService(id, body);

    if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ updatedUser });
};

export const deleteUser = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const id = req.params.id;
    const _deletedUser = await deleteUserService(id);

    if (!deleteUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(204).send();
};
