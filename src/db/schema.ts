import { relations } from "drizzle-orm";
import {
  boolean,
  text,
  timestamp,
  uuid,
  integer,
  pgTable,
  pgEnum,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const matchResultEnum = pgEnum("match_result", ["W", "D", "L"]);

export const match = pgTable("match", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  played_at: timestamp("played_at").notNull().defaultNow(),
  your_deck: text("your_deck").notNull(),
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
  game_number: integer("game_number").notNull(),
  started_play: boolean("started_play"),
  won_game: boolean("won_game"),
});

export const matchRelations = relations(match, ({ many, one }) => ({
  games: many(game),
  user: one(users, {
    fields: [match.user_id],
    references: [users.id],
  }),
}));

export const gameRelations = relations(game, ({ one }) => ({
  match: one(match, {
    fields: [game.match_id],
    references: [match.id],
  }),
}));

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const userRelations = relations(users, ({ many }) => ({
  matches: many(match),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
