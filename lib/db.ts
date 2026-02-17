import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL is not set. Database operations will fail. Using dummy connection string.");
}

const connectionString = process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/db";
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
