import { relations } from "drizzle-orm";
import {
  boolean,
  text,
  timestamp,
  uuid,
  integer,
  pgTable,
  pgEnum,
} from "drizzle-orm/pg-core";

export const matchResultEnum = pgEnum("match_result", ["W", "D", "L"]);

export const match = pgTable("match", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  your_deck: text("your_deck"),
  opp_deck: text("opponent_deck"),
  result: matchResultEnum("result").notNull(),
  your_points: integer("your_points").default(0),
  opp_points: integer("opp_points").default(0),
  format: text("format"),
  notes: text("notes"),
});

export const game = pgTable("game", {
  id: uuid("id").defaultRandom().primaryKey(),
  match_id: uuid("match_id").references(() => match.id),
  game_number: integer("game_number"),
  started_play: boolean("started_play"),
  won_game: boolean("won_game"),
});

export const matchRelations = relations(match, ({ many }) => ({
  games: many(game),
}));

export const gameRelations = relations(game, ({ one }) => ({
  match: one(match, {
    fields: [game.match_id],
    references: [match.id],
  }),
}));
