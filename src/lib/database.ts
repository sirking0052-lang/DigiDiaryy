import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabaseSync('digidiary.db');

export async function initializeDatabase() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT 'Untitled',
      content TEXT DEFAULT '',
      category TEXT NOT NULL DEFAULT 'personal',
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      sync_status TEXT NOT NULL DEFAULT 'pending'
    );
  `);
}

export default db;
