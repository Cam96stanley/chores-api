import argon2 from 'argon2'; // correct
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import type {
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
