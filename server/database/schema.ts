import * as t from "drizzle-orm/sqlite-core"
import { sqliteTable } from "drizzle-orm/sqlite-core"

export const links = sqliteTable("links", {
  key: t.text("key").primaryKey(),
  type: t.text("type", { enum: ["url", "file"] }).notNull(),
  target: t.text("target").notNull(),
})
