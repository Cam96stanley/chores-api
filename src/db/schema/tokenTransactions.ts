import { integer, pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';
import { choreAssignments } from './choreAssignments.js';
import { familyMembers } from './familyMembers.js';
import { timestamps } from './helpers.js';
import { shopRedemptions } from './shopRedemptions.js';

export const tokenTransactionType = pgEnum('token_transaction_type', [
    'earned',
    'spent',
    'adjustment',
]);

export const tokenTransactions = pgTable('token_transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    amount: integer('amount').notNull(),
    type: tokenTransactionType().notNull(),
    familyMemberId: uuid('family_member_id')
        .notNull()
        .references(() => familyMembers.id),
    choreAssignmentId: uuid('chore_assignment_id')
        .notNull()
        .references(() => choreAssignments.id),
    shopRedemptionId: uuid('shop_redemption_id')
        .notNull()
        .references(() => shopRedemptions.id),
    ...timestamps,
});
