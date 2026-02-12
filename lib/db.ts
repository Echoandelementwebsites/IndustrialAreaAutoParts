import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

if (!process.env.DATABASE_URL) {
  // Allow for development or build without strict failure if env is missing
  // This will fail later if actual DB operations are attempted without setting it.
  console.warn("DATABASE_URL is not set. Database operations will fail.");
}

const connectionString = process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock";
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
