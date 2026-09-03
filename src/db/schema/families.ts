import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.js';
import { users } from './users.js';

export const families = pgTable('families', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    createdBy: uuid('created_by')
        .notNull()
        .references(() => users.id),
    ...timestamps,
});
