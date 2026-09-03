import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { familyMembers } from '../db/schema/familyMembers.js';
import type { CreateFamilyMemberInput } from '../db/schema/familyMembers.validation.js';
import { users } from '../db/schema/users.js';

export const createFamilyMemberService = async (
    data: CreateFamilyMemberInput & { familyId: string },
) => {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, data.userId))
        .limit(1);

    if (!user) {
        throw new Error('User not found');
    }

    const [existingMember] = await db
        .select()
        .from(familyMembers)
        .where(
            and(
                eq(familyMembers.familyId, data.familyId),
                eq(familyMembers.userId, data.userId),
            ),
        )
        .limit(1);

    if (existingMember) {
        throw new Error('User is already a member of this family');
    }

    const [familyMember] = await db
        .insert(familyMembers)
        .values(data)
        .returning();
    return familyMember;
};
