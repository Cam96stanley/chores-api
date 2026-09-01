import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.js';

export const families = pgTable('families', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    ...timestamps,
});
