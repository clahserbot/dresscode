import postgres from 'postgres';
import fs from 'fs';

const sqlString = fs.readFileSync('seed.sql', 'utf8');
const sql = postgres(process.env.DATABASE_URL);

async function run() {
  try {
    await sql.unsafe(sqlString);
    console.log('Seed executed successfully');
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

run();
