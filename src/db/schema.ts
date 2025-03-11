import { integer, text, boolean, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const matchResultEnum = pgEnum("match_result", ["W", "D", "L"]);

export const match = pgTable("match", {
  id: integer("id").primaryKey(),
  result: matchResultEnum("result"),
  your_deck: text("your_deck"),
  opp_deck: text("opponent_deck"),
  notes: text("notes"),
});
