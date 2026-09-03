import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { familyMembers } from './familyMembers.js';

export const createFamilyMemberSchema = createInsertSchema(familyMembers).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export type CreateFamilyMemberInput = z.infer<typeof createFamilyMemberSchema>;

export const updateFamilyMemberSchema = createUpdateSchema(familyMembers)
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided',
    });

export type UpdateFamilyMemberInput = z.infer<typeof updateFamilyMemberSchema>;
