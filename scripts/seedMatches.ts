import { db } from "../src/db/drizzle";
import { match, game } from "../src/db/schema";
import { config } from "dotenv";

config({ path: ".env" });

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

const generateSampleMatches = (
  userId: string,
  count: number = 50
): MatchSeedData[] => {
  const yourDeckTypes = [
    "Mono W Soldiers",
    "Mono R Goblins",
    "Mono U Merfolk",
    "Mono B Zombies",
    "Mono G Elves",
  ];

  const oppDeckTypes = [
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

  const formats = [
    "Standard",
    "Pauper",
    "Draft",
  ];

  const matches: MatchSeedData[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const matchDate = new Date(today);
    matchDate.setDate(today.getDate() - daysAgo);

    const yourDeckIndex = Math.floor(Math.random() * yourDeckTypes.length);
    const oppDeckIndex = Math.floor(Math.random() * oppDeckTypes.length);
    const formatIndex = Math.floor(Math.random() * formats.length);

    const matchPattern = determineMatchPattern();
    const games = generateGamesForPattern(matchPattern);

    const yourWins = games.filter((g) => g.won_game).length;
    const oppWins = games.length - yourWins;

    let note = "";
    if (yourWins > oppWins) {
      note = `Good matchup against ${oppDeckTypes[oppDeckIndex]}. Sideboard plan worked well.`;
    } else if (yourWins < oppWins) {
      note = `Difficult matchup. Need to adjust sideboard for ${oppDeckTypes[oppDeckIndex]}.`;
    } else {
      note = `Even matchup. Time ended before we could finish game ${
        games.length + 1
      }.`;
    }

    matches.push({
      your_deck: yourDeckTypes[yourDeckIndex],
      opp_deck: oppDeckTypes[oppDeckIndex],
      format: formats[formatIndex],
      notes: note,
      played_at: matchDate,
      games: games,
    });
  }

  return matches;
};

function determineMatchPattern(): string {
  const rand = Math.random() * 100;

  // Most matches end 2-0 or 2-1
  if (rand < 35) return "2-1"; // You win 2-1
  if (rand < 65) return "1-2"; // Opponent wins 2-1
  if (rand < 80) return "2-0"; // You win 2-0
  if (rand < 90) return "0-2"; // Opponent wins 2-0
  if (rand < 95) return "1-1"; // Draw (time)
  if (rand < 97.5) return "1-0"; // Rare single game win
  return "0-1"; // Rare single game loss
}

function generateGamesForPattern(pattern: string): GameSeedData[] {
  const games: GameSeedData[] = [];

  // For game 1, play/draw is ~50/50
  const firstGameOnPlay = Math.random() > 0.5;

  switch (pattern) {
    case "2-0": // You win both games
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: true,
      });
      games.push({
        game_number: 2,
        // In game 2, opponent is on play (they lost game 1)
        started_play: false,
        won_game: true,
      });
      break;

    case "0-2": // Opponent wins both games
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: false,
      });
      games.push({
        game_number: 2,
        // In game 2, you are on play (you lost game 1)
        started_play: true,
        won_game: false,
      });
      break;

    case "2-1": // You win 2-1
      // First two games are split
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: Math.random() > 0.5, // 50% chance you win game 1
      });
      games.push({
        game_number: 2,
        // Player who lost game 1 is on play for game 2
        started_play: !games[0].won_game,
        won_game: !games[0].won_game, // You win the game your opponent won before
      });
      games.push({
        game_number: 3,
        // Player who lost game 2 is on play for game 3
        started_play: !games[1].won_game,
        won_game: true, // You win the deciding game
      });
      break;

    case "1-2": // Opponent wins 2-1
      // First two games are split
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: Math.random() > 0.5, // 50% chance you win game 1
      });
      games.push({
        game_number: 2,
        // Player who lost game 1 is on play for game 2
        started_play: !games[0].won_game,
        won_game: !games[0].won_game, // You win the game your opponent won before
      });
      games.push({
        game_number: 3,
        // Player who lost game 2 is on play for game 3
        started_play: !games[1].won_game,
        won_game: false, // You lose the deciding game
      });
      break;

    case "1-1": // Draw due to time
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: Math.random() > 0.5, // 50% chance you win game 1
      });
      games.push({
        game_number: 2,
        // Player who lost game 1 is on play for game 2
        started_play: !games[0].won_game,
        won_game: !games[0].won_game, // Second player wins
      });
      break;

    case "1-0": // Rare single game win
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: true,
      });
      break;

    case "0-1": // Rare single game loss
      games.push({
        game_number: 1,
        started_play: firstGameOnPlay,
        won_game: false,
      });
      break;
  }

  return games;
}

async function seedMatches(userId: string, count: number) {
  try {
    console.log(`Seeding ${count} matches for user ${userId}...`);
    const matchesData = generateSampleMatches(userId, count);

    for (const matchData of matchesData) {
      const your_points = matchData.games.filter((g) => g.won_game).length;
      const opp_points = matchData.games.filter((g) => !g.won_game).length;

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

      console.log(
        `Added match of ${matchData.format}: ${matchData.your_deck} vs ${matchData.opp_deck} (${result}, ${your_points}-${opp_points})`
      );
    }

    console.log(
      `Successfully seeded ${matchesData.length} matches for user ${userId}`
    );
  } catch (error) {
    console.error("Error seeding matches:", error);
  } finally {
    process.exit(0);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Error: User ID is required");
    console.log("Usage: npm run db:seed-matches -- <userId> [matchCount=15]");
    process.exit(1);
  }

  const userId = args[0];
  const count = args[1] ? parseInt(args[1], 10) : 15;

  if (isNaN(count)) {
    console.error("Error: Match count must be a number");
    process.exit(1);
  }

  return { userId, count };
}

const { userId, count } = parseArgs();
seedMatches(userId, count);
