import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { chores } from './chores.js';
import { familyMembers } from './familyMembers.js';
import { timestamps } from './helpers.js';

export const choreAssignmentStatus = pgEnum('chore_assignment_status', [
    'pending',
    'submitted',
    'completed',
]);

export const choreAssignments = pgTable('chore_assignment', {
    id: uuid('id').defaultRandom().primaryKey(),
    status: choreAssignmentStatus().default('pending').notNull(),
    dueDate: timestamp('due_date', { withTimezone: true }).notNull(),
    submittedAt: timestamp('submitted_at', { withTimezone: true }),
    approvedAt: timestamp('approved_at', { withTimezone: true }),
    familyMemberId: uuid('family_member_id')
        .notNull()
        .references(() => familyMembers.id),
    choreId: uuid('chore_id')
        .notNull()
        .references(() => chores.id),
    ...timestamps,
});
