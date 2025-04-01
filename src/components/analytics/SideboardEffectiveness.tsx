"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InferSelectModel } from "drizzle-orm";
import { match as matchSchema, game as gameSchema } from "@/db/schema";

type Game = InferSelectModel<typeof gameSchema>;
type Match = InferSelectModel<typeof matchSchema>;

interface SideboardEffectivenessProps {
  matches: Match[];
  games: Game[];
}

interface MatchupSideboardData {
  name: string;
  difference: number;
  g1WinRate: number;
  postSideboardWinRate: number;
  matchCount: number;
  g1Games: number;
  postSideboardGames: number;
  g1Wins: number;
  postSideboardWins: number;
}

export function SideboardEffectiveness({
  matches,
  games,
}: SideboardEffectivenessProps) {
  // Create a map of match id to opponent deck
  const matchToOppDeckMap = new Map<string, string>();
  matches.forEach((match) => {
    matchToOppDeckMap.set(match.id, match.opp_deck || "Unknown");
  });

  // Group games by opponent deck and game number
  const matchupData: Record<
    string,
    { g1Wins: number; g1Total: number; postSBWins: number; postSBTotal: number }
  > = {};

  games.forEach((game) => {
    if (!game.match_id) return;

    const oppDeck = matchToOppDeckMap.get(game.match_id) || "Unknown";

    if (!matchupData[oppDeck]) {
      matchupData[oppDeck] = {
        g1Wins: 0,
        g1Total: 0,
        postSBWins: 0,
        postSBTotal: 0,
      };
    }

    if (game.game_number === 1) {
      matchupData[oppDeck].g1Total += 1;
      if (game.won_game) {
        matchupData[oppDeck].g1Wins += 1;
      }
    } else if (game.game_number > 1) {
      matchupData[oppDeck].postSBTotal += 1;
      if (game.won_game) {
        matchupData[oppDeck].postSBWins += 1;
      }
    }
  });

  const chartData: MatchupSideboardData[] = Object.entries(matchupData)
    .map(([oppDeck, data]) => {
      const g1WinRate =
        data.g1Total > 0 ? (data.g1Wins / data.g1Total) * 100 : 0;
      const postSBWinRate =
        data.postSBTotal > 0 ? (data.postSBWins / data.postSBTotal) * 100 : 0;

      return {
        name: oppDeck,
        g1WinRate,
        postSideboardWinRate: postSBWinRate,
        difference: postSBWinRate - g1WinRate,
        matchCount: data.g1Total + data.postSBTotal,
        g1Games: data.g1Total,
        postSideboardGames: data.postSBTotal,
        g1Wins: data.g1Wins,
        postSideboardWins: data.postSBWins,
      };
    })
    .filter((item) => item.g1Games > 0 && item.postSideboardGames > 0)
    .sort((a, b) => b.difference - a.difference);

  if (chartData.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        Not enough sideboard data available
      </div>
    );
  }

  return (
    <div className="px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Matchup</TableHead>
            <TableHead className="text-right">Game 1</TableHead>
            <TableHead className="text-right">Post-SB</TableHead>
            <TableHead className="text-right">Difference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chartData.map((matchup, index) => (
            <TableRow key={index}>
              <TableCell className="text-sm">{matchup.name}</TableCell>
              <TableCell className="text-right">
                {matchup.g1WinRate.toFixed(1)}%
                <span className="text-xs text-muted-foreground ml-1">
                  ({matchup.g1Wins}/{matchup.g1Games})
                </span>
              </TableCell>
              <TableCell className="text-right">
                {matchup.postSideboardWinRate.toFixed(1)}%
                <span className="text-xs text-muted-foreground ml-1">
                  ({matchup.postSideboardWins}/{matchup.postSideboardGames})
                </span>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${
                  matchup.difference > 0
                    ? "text-green-500"
                    : matchup.difference < 0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {matchup.difference > 0 ? "+" : ""}
                {matchup.difference.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
