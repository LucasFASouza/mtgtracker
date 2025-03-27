"use server";
import { eq, and, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { match, game } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const requireAuth = async () => {
  const session = await auth();
  if (!session || !session.user?.id) {
    redirect("/login");
  }
  return session.user;
};

interface MatchFilters {
  format?: string | null;
  deck?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const getMatches = async (filters?: MatchFilters) => {
  const user = await requireAuth();

  if (!user || !user.id) {
    return [];
  }

  let whereConditions = [eq(match.user_id, user.id)];

  if (filters?.format) {
    whereConditions.push(eq(match.format, filters.format));
  }

  if (filters?.deck) {
    whereConditions.push(eq(match.your_deck, filters.deck));
  }

  if (filters?.startDate) {
    const startDateStr = filters.startDate.toISOString().split("T")[0];
    whereConditions.push(
      gte(match.played_at, new Date(`${startDateStr}T00:00:00.000Z`))
    );
  }

  if (filters?.endDate) {
    const endDateStr = filters.endDate.toISOString().split("T")[0];
    whereConditions.push(
      lte(match.played_at, new Date(`${endDateStr}T23:59:59.999Z`))
    );
  }

  const data = await db.query.match.findMany({
    where: and(...whereConditions),
    orderBy: (match, { desc }) => [desc(match.played_at)],
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
  played_at: Date,
  games: GameData[]
) => {
  const user = await requireAuth();

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
      user_id: user.id,
      your_deck,
      opp_deck,
      format,
      notes,
      played_at,
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
  const user = await requireAuth();

  const matchToDelete = await db.query.match.findFirst({
    where: and(eq(match.id, id), eq(match.user_id, user.id)),
  });

  if (!matchToDelete) {
    throw new Error(
      "Match not found or you don't have permission to delete it"
    );
  }

  await db.delete(game).where(eq(game.match_id, id));
  await db.delete(match).where(eq(match.id, id));

  revalidatePath("/");
};
