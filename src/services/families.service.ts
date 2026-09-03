import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { families } from '../db/schema/families.js';
import type {
    CreateFamilyInput,
    UpdateFamilyInput,
} from '../db/schema/families.validation.js';

export const createFamilyService = async ({ name }: CreateFamilyInput) => {
    const [family] = await db
        .insert(families)
        .values({ name })
        .returning({ id: families.id, name: families.name });

    return family;
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
