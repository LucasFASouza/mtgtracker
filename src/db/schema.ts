import { relations } from "drizzle-orm";
import { text, timestamp, uuid, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const matchResultEnum = pgEnum("match_result", ["W", "D", "L"]);

export const match = pgTable("match", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  result: matchResultEnum("result"),
  your_deck: text("your_deck"),
  opp_deck: text("opponent_deck"),
  notes: text("notes"),
});

export const tag = pgTable("tag", {
  text: text("text").notNull().primaryKey(),
});

export const matchRelations = relations(match, ({ many }) => ({
  tags: many(tag),
}));
