import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../env";
import postgres from "postgres";

const connectionString = env.DATABASE_URL;
const client = postgres(connectionString);
export const db = drizzle(client, {
  logger: env.NODE_ENV === "development"
});
