import 'dotenv/config';

function requireEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export const env = {
    port: requireEnv('PORT'),
    databaseUrl: requireEnv('DATABASE_URL'),
    databaseMigrationUrl: requireEnv('DATABASE_MIGRATION_URL'),
};
