CREATE TYPE "public"."match_result" AS ENUM('W', 'D', 'L');--> statement-breakpoint
CREATE TABLE "match" (
	"id" integer PRIMARY KEY NOT NULL,
	"result" "match_result",
	"your_deck" text,
	"opponent_deck" text,
	"notes" text
);
