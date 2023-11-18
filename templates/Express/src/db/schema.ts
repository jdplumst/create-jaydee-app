import { index, pgTableCreator, serial, varchar } from "drizzle-orm/pg-core";

// Change this table prefix
export const pgTable = pgTableCreator((name) => `todo-express_${name}`);

export const todo = pgTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }),
    status: varchar("status", {
      enum: ["backlog", "ongoing", "complete"]
    })
      .default("backlog")
      .notNull(),
    priority: varchar("priority", { enum: ["low", "medium", "high"] })
      .default("high")
      .notNull()
  },
  (table) => ({
    nameIndex: index("name_idx").on(table.name)
  })
);
