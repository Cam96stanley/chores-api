import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from './users.js';

export const createUserSchema = createInsertSchema(users, {
    email: (_schema) => z.email('Invalid email address'),
    password: (schema) =>
        schema.min(8, 'Password must be at least 8 characters'),
}).omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUpdateSchema(users, {
    email: (_schema) => z.email('Invalid email address'),
})
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        password: true,
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided',
    });

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const loginSchema = createInsertSchema(users, {
    email: (_schema) => z.email('Invalid email address'),
    password: (schema) =>
        schema.min(8, 'Password must be at least 8 characters'),
}).pick({ email: true, password: true });

export type CreateLoginInput = z.infer<typeof loginSchema>;
