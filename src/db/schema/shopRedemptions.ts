import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { familyMembers } from './familyMembers.js';
import { timestamps } from './helpers.js';
import { shopItems } from './shopItems.js';

export const shopRedemptions = pgTable('shop_redemptions', {
    id: uuid('id').defaultRandom().primaryKey(),
    tokenCost: integer('token_cost').notNull(),
    familyMemberId: uuid('family_member_id')
        .notNull()
        .references(() => familyMembers.id),
    shopItemId: uuid('shop_item_id')
        .notNull()
        .references(() => shopItems.id),
    ...timestamps,
});
