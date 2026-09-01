import type { Request, Response } from 'express';
import type { CreateUserInput } from '../db/schema/users.validation.js';
import { createUserService } from '../services/users.service.js';

export const createUser = async (
    req: Request<Record<string, string>, unknown, CreateUserInput>,
    res: Response,
) => {
    const { name, email, password } = req.body;
    const user = await createUserService({ name, email, password });
    res.status(201).json({ user });
};
