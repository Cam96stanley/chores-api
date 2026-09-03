import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { families } from './families.js';

export const createFamiliesSchema = createInsertSchema(families, {
    name: (schema) => schema.min(1).max(100),
}).omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });

export type CreateFamilyInput = z.infer<typeof createFamiliesSchema>;

export const updateFamiliesSchema = createUpdateSchema(families, {
    name: (schema) => schema.min(1).max(100),
})
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided',
    });

export type UpdateFamilyInput = z.infer<typeof updateFamiliesSchema>;
