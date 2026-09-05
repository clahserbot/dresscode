import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from './schema';

export function getDb() {
  const dbBinding = process.env.DB || getRequestContext().env?.DB;
  if (!dbBinding) {
    throw new Error('Database binding not found');
  }
  return drizzle(dbBinding, { schema });
}
