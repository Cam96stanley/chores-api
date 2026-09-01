import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { families } from './families.js';
import { timestamps } from './helpers.js';

export const chores = pgTable('chores', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    description: varchar('description'),
    tokenAmount: integer('token_amount').notNull(),
    frequency: integer('frequency').notNull(),
    familyId: uuid('family_id')
        .notNull()
        .references(() => families.id),
    ...timestamps,
});
