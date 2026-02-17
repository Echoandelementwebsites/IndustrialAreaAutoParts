import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

// Determine the connection string to use.
// 1. Prefer the environment variable.
// 2. Fallback to a dummy string for build environments (CI) where the secret might be missing.
//    This prevents the module from crashing on import.
//    Runtime queries will fail if the URL is invalid, but that's handled by try-catch blocks in sitemap/etc.
const connectionString = process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db";

if (!process.env.DATABASE_URL) {
  // Log a warning so developers know they are using a fallback.
  console.warn("DATABASE_URL is not set. Using dummy connection string. DB queries will fail.");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
