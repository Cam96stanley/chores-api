import 'dotenv/config';
import pg from 'pg';

const client = new pg.Client({
    connectionString: process.env.DATABASE_MIGRATION_URL,
    connectionTimeoutMillis: 10000,
});

console.log('Connecting...');

try {
    await client.connect();

    console.log('Connected!');

    const result = await client.query('SELECT NOW()');

    console.log(result.rows);

    await client.end();
} catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
}