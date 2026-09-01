import {
    boolean,
    integer,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';
import { families } from './families.js';

export const shopItems = pgTable('shop_items', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    description: varchar('description'),
    tokenCost: integer('token_cost').notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    familyId: uuid('family_id')
        .notNull()
        .references(() => families.id),
    ...timestamp,
});
