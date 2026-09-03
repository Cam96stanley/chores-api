import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { families } from '../db/schema/families.js';
import type {
    CreateFamilyInput,
    UpdateFamilyInput,
} from '../db/schema/families.validation.js';
import { familyMembers } from '../db/schema/familyMembers.js';

export const createFamilyService = async (
    userId: string,
    data: CreateFamilyInput,
) => {
    return await db.transaction(async (tx) => {
        const [family] = await tx.insert(families).values(data).returning();

        await tx.insert(familyMembers).values({
            familyId: family.id,
            userId,
            role: 'parent',
        });

        return family;
    });
};

export const getFamiliesService = async () => {
    const allFamilies = await db
        .select({ id: families.id, name: families.name })
        .from(families);
    return allFamilies;
};

export const getFamilyService = async (id: string) => {
    const family = await db
        .select({ id: families.id, name: families.name })
        .from(families)
        .where(eq(families.id, id));
    return family;
};

export const updateFamilyService = async (
    id: string,
    data: UpdateFamilyInput,
) => {
    const [family] = await db
        .update(families)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(families.id, id))
        .returning({ id: families.id, name: families.name });
    return family;
};

export const deleteFamilyService = async (id: string) => {
    const [family] = await db
        .delete(families)
        .where(eq(families.id, id))
        .returning();
    return family;
};
