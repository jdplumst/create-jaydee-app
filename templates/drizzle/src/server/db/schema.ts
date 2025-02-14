import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: int("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
});
