"use server";
import { db } from "@/db/drizzle";
import { match, game } from "@/db/schema";
import { revalidatePath } from "next/cache";

type GameSeedData = {
  game_number: number;
  started_play: boolean | null;
  won_game: boolean;
};

type MatchSeedData = {
  your_deck: string;
  opp_deck: string;
  format: string;
  notes: string;
  played_at: Date;
  games: GameSeedData[];
};

const generateSampleMatches = (userId: string, count: number = 15): MatchSeedData[] => {
  const deckTypes = [
    "Golgari Reanimator",
    "Boros Burn",
    "Simic Ramp",
    "Azorius Control",
    "Rakdos Midrange",
    "Selesnya Tokens",
    "Dimir Tempo",
    "Gruul Stompy",
    "Orzhov Lifegain",
    "Izzet Spellslinger",
  ];

  const formats = ["Standard", "Modern", "Pioneer", "Pauper", "Draft", "Sealed"];

  const matches: MatchSeedData[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const matchDate = new Date(today);
    matchDate.setDate(today.getDate() - daysAgo);

    const yourDeckIndex = Math.floor(Math.random() * deckTypes.length);
    let oppDeckIndex = Math.floor(Math.random() * deckTypes.length);
    while (oppDeckIndex === yourDeckIndex) {
      oppDeckIndex = Math.floor(Math.random() * deckTypes.length);
    }
    
    const formatIndex = Math.floor(Math.random() * formats.length);
    
    const numGames = Math.floor(Math.random() * 3) + 1;
    const games: GameSeedData[] = [];
    
    let yourWins = 0;

    for (let g = 0; g < numGames; g++) {
      let onPlay = null;
      if (g === 0) {
        onPlay = Math.random() > 0.5;
      } else {
        const previousGameWon = games[g - 1].won_game;
        onPlay = !previousGameWon;
      }
      
      const wonGame = onPlay ? Math.random() < 0.55 : Math.random() < 0.45;
      
      if (wonGame) yourWins++;
      
      games.push({
        game_number: g + 1,
        started_play: onPlay,
        won_game: wonGame,
      });
    }
    
    let note = "";
    if (yourWins > numGames / 2) {
      note = `Good matchup against ${deckTypes[oppDeckIndex]}. Sideboard plan worked well.`;
    } else {
      note = `Difficult matchup. Need to adjust sideboard for ${deckTypes[oppDeckIndex]}.`;
    }

    matches.push({
      your_deck: deckTypes[yourDeckIndex],
      opp_deck: deckTypes[oppDeckIndex],
      format: formats[formatIndex],
      notes: note,
      played_at: matchDate,
      games: games,
    });
  }

  return matches;
};

export const seedMatches = async (userId: string, count: number = 15) => {
  try {
    const matchesData = generateSampleMatches(userId, count);
    
    for (const matchData of matchesData) {
      const your_points = matchData.games.filter(g => g.won_game).length;
      const opp_points = matchData.games.filter(g => !g.won_game).length;
      
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
          user_id: userId,
          your_deck: matchData.your_deck,
          opp_deck: matchData.opp_deck,
          format: matchData.format,
          notes: matchData.notes,
          played_at: matchData.played_at,
          result,
          your_points,
          opp_points,
        })
        .returning({ id: match.id });
        
      if (matchData.games.length > 0) {
        await db.insert(game).values(
          matchData.games.map((g) => ({
            match_id: newMatch.id,
            game_number: g.game_number,
            started_play: g.started_play,
            won_game: g.won_game,
          }))
        );
      }
    }
    
    revalidatePath("/");
    return { success: true, message: `Successfully seeded ${matchesData.length} matches for user ${userId}` };
    
  } catch (error) {
    console.error("Error seeding matches:", error);
    return { success: false, message: `Error seeding matches: ${error instanceof Error ? error.message : String(error)}` };
  }
};
