import argon2 from 'argon2'; // correct
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import type {
    CreateLoginInput,
    CreateUserInput,
    UpdateUserInput,
} from '../db/schema/users.validation.js';

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

export const loginService = async ({ email, password }: CreateLoginInput) => {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
        expiresIn: env.jwtExpiresIn,
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};

export const getUsersService = async () => {
    const allUsers = await db
        .select({ id: users.id, name: users.name, email: users.email })
        .from(users);
    return allUsers;
};

export const getUserService = async (id: string) => {
    const [user] = await db
        .select({ id: users.id, name: users.name, email: users.email })
        .from(users)
        .where(eq(users.id, id));

    return user;
};

export const updateUserService = async (id: string, data: UpdateUserInput) => {
    const [user] = await db
        .update(users)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(users.id, id))
        .returning({ id: users.id, name: users.name, email: users.email });

    console.log('update result:', user);

    return user;
};

export const deleteUserService = async (id: string) => {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
};
