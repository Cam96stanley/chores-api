import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { families } from './families.js';
import { familyMemberRole } from './familyMembers.js';
import { users } from './users.js';

export const familyInvitations = pgTable('family_invitations', {
    id: uuid('id').defaultRandom().primaryKey(),
    familyId: uuid('family_id')
        .notNull()
        .references(() => families.id),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id),
    role: familyMemberRole().notNull(),
});
