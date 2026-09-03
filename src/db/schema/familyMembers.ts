import { pgEnum, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { families } from './families.js';
import { timestamps } from './helpers.js';
import { users } from './users.js';

export const familyMemberRole = pgEnum('family_member_role', [
    'parent',
    'child',
]);

export const familyMembers = pgTable(
    'family_members',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        role: familyMemberRole().notNull(),
        familyId: uuid('family_id')
            .notNull()
            .references(() => families.id),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id),
        ...timestamps,
    },
    (table) => ({
        familyUserUnique: unique().on(table.familyId, table.userId),
    }),
);
