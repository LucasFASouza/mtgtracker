"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { match, game } from "@/db/schema";

export const getMatches = async () => {
  const data = await db.query.match.findMany({
    orderBy: (match, { desc }) => [desc(match.created_at)],
    with: {
      games: {
        orderBy: (game, { asc }) => [asc(game.game_number)],
      },
    },
  });
  return data;
};

type GameData = {
  game_number: number;
  started_play: boolean | null;
  won_game: boolean;
};

export const addMatch = async (
  your_deck: string,
  opp_deck: string,
  format: string,
  notes: string,
  games: GameData[]
) => {
  const your_points = games.filter((g) => g.won_game).length;
  const opp_points = games.filter((g) => !g.won_game).length;

  let result: "W" | "D" | "L";
  if (your_points > opp_points) {
    result = "W";
  } else if (your_points < opp_points) {
    result = "L";
  } else {
    result = "D";
  }

  const [newMatch] = await db
    .insert(match)
    .values({
      your_deck,
      opp_deck,
      format,
      notes,
      result,
      your_points,
      opp_points,
    })
    .returning({ id: match.id });

  if (games.length > 0) {
    await db.insert(game).values(
      games.map((g) => ({
        match_id: newMatch.id,
        game_number: g.game_number,
        started_play: g.started_play,
        won_game: g.won_game,
      }))
    );
  }

  revalidatePath("/");
};

export const deleteMatch = async (id: string) => {
  await db.delete(game).where(eq(game.match_id, id));
  await db.delete(match).where(eq(match.id, id));

  revalidatePath("/");
};
