import argon2 from 'argon2'; // correct
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import type { CreateUserInput } from '../db/schema/users.validation.js';

export const createUserService = async ({
    name,
    email,
    password,
}: CreateUserInput) => {
    const passwordHash = await argon2.hash(password);

    const [user] = await db
        .insert(users)
        .values({ name, email, password: passwordHash })
        .returning({ id: users.id, name: users.name, email: users.email });

    return user;
};
