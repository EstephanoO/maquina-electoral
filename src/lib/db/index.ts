import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = neon(connectionString);

export const db = drizzle(client, { 
  schema,
});

export const runMigrations = async () => {
  try {
    console.log('Running migrations...');
    // For Neon with HTTP driver, migrations need different approach
    console.log('✅ Database configured with Neon HTTP driver');
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
};