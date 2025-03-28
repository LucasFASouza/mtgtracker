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
import { game as gameSchema } from "@/db/schema";

type Game = InferSelectModel<typeof gameSchema>;

interface PlayDrawWinratesProps {
  games: Game[];
}

export function PlayDrawWinrates({ games }: PlayDrawWinratesProps) {
  // Filter out games with undefined started_play
  const validGames = games.filter((game) => game.started_play !== null);

  if (validGames.length === 0) {
    return (
      <div className="flex h-[100px] items-center justify-center text-muted-foreground">
        No play/draw data available
      </div>
    );
  }

  // On the play stats
  const onPlayGames = validGames.filter((game) => game.started_play === true);
  const onPlayWins = onPlayGames.filter(
    (game) => game.won_game === true
  ).length;
  const onPlayWinrate =
    onPlayGames.length > 0 ? (onPlayWins / onPlayGames.length) * 100 : 0;

  // On the draw stats
  const onDrawGames = validGames.filter((game) => game.started_play === false);
  const onDrawWins = onDrawGames.filter(
    (game) => game.won_game === true
  ).length;
  const onDrawWinrate =
    onDrawGames.length > 0 ? (onDrawWins / onDrawGames.length) * 100 : 0;

  // Calculate the difference
  const playDrawDifference = onPlayWinrate - onDrawWinrate;

  return (
    <div className="px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Position</TableHead>
            <TableHead className="text-right">Games</TableHead>
            <TableHead className="text-right">Wins</TableHead>
            <TableHead className="text-right">Win Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">On the Play</TableCell>
            <TableCell className="text-right">{onPlayGames.length}</TableCell>
            <TableCell className="text-right">{onPlayWins}</TableCell>
            <TableCell
              className={`text-right ${
                onPlayWinrate > 50
                  ? "text-green-500"
                  : onPlayWinrate < 50
                  ? "text-red-500"
                  : ""
              }`}
            >
              {onPlayWinrate.toFixed(1)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">On the Draw</TableCell>
            <TableCell className="text-right">{onDrawGames.length}</TableCell>
            <TableCell className="text-right">{onDrawWins}</TableCell>
            <TableCell
              className={`text-right ${
                onDrawWinrate > 50
                  ? "text-green-500"
                  : onDrawWinrate < 50
                  ? "text-red-500"
                  : ""
              }`}
            >
              {onDrawWinrate.toFixed(1)}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="font-medium">
              Play vs Draw Difference
            </TableCell>
            <TableCell
              className={`text-right font-medium ${
                playDrawDifference > 0
                  ? "text-green-500"
                  : playDrawDifference < 0
                  ? "text-red-500"
                  : ""
              }`}
            >
              {playDrawDifference > 0 ? "+" : ""}
              {playDrawDifference.toFixed(1)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
