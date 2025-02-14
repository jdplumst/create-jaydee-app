export const posts = sqliteTable("posts", {
  id: int("id").primaryKey()),
  title: text("title").notNull(),
  content: text("content"),
});