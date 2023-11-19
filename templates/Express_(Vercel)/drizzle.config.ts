import { type Config } from "drizzle-kit";

import { env } from "~/env.js";

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL
  },
  // Change this table prefix
  tablesFilter: ["express-todo_*"]
} satisfies Config;
