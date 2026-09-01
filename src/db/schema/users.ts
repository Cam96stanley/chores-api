import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.js';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    ...timestamps,
});
