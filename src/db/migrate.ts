import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_MIGRATION_URL,
});

const db = drizzle(pool);

try {
    await migrate(db, {
        migrationsFolder: './drizzle',
    });

    console.log('Migrations applied successfully');
} catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
} finally {
    await pool.end();
}