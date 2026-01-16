#!/usr/bin/env bun

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../src/lib/db/index';

async function runMigrations() {
  try {
    console.log('🚀 Running database migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();