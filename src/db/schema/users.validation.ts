import { createInsertSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { users } from './users.js';

export const createUserSchema = createInsertSchema(users, {
    email: (schema) => schema.email('Invalid email address'),
    password: (schema) =>
        schema.min(8, 'Password must be at least 8 characters'),
}).omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;
