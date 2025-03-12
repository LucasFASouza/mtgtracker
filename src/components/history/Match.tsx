import { deleteMatch } from "@/actions/matchAction";
import { match, game } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Match = InferSelectModel<typeof match> & {
  games?: InferSelectModel<typeof game>[];
};

interface MatchProps {
  match: Match;
}

export default function Match({ match }: MatchProps) {
  const handleDelete = async () => {
    await deleteMatch(match.id);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between pb-4">
        <h3 className="text-lg font-medium">
          {match?.your_deck}
          <span className="font-light text-muted-foreground"> vs </span>
          {match?.opp_deck}
        </h3>

        <div className="flex items-center mt-2">
          <span className="text-sm text-muted-foreground mr-2">Result:</span>
          <Badge
            variant={
              match.result === "W"
                ? "default"
                : match.result === "L"
                ? "sad"
                : "secondary"
            }
          >
            {match.result === "W"
              ? "Win"
              : match.result === "L"
              ? "Loss"
              : "Draw"}
          </Badge>
          <span className="ml-2 text-sm font-medium">
            {match.your_points} - {match.opp_points}
          </span>
        </div>
      </div>

      {match.format && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">Format</h4>
          <p className="text-sm text-muted-foreground">{match.format}</p>
        </div>
      )}

      {/* Games section */}
      {match.games && match.games.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Games</h4>
          <div className="space-y-2">
            {match.games.map((game) => (
              <div key={game.id} className="border rounded p-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Game {game.game_number}</span>
                  <Badge variant={game.won_game ? "default" : "sad"}>
                    {game.won_game ? "Won" : "Lost"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {game.started_play
                    ? "Started on the play"
                    : "Started on the draw"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Date</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(match.created_at).toLocaleDateString()}
          </p>
        </div>

        {match.notes && (
          <div>
            <h4 className="text-sm font-medium mb-1">Notes</h4>
            <p className="text-sm text-muted-foreground">{match.notes}</p>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
