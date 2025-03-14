import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { game as gameSchema } from "@/db/schema";

interface MatchReviewProps {
  yourDeck: string;
  oppDeck: string;
  format: string;
  date?: Date;
  games: Array<{
    game_number: number;
    started_play: boolean | null;
    won_game: boolean | null;
  }>;
  notes?: string;
  compact?: boolean;
}

export default function MatchReview({
  yourDeck,
  oppDeck,
  format,
  date = new Date(),
  games,
  notes,
}: MatchReviewProps) {
  const playedGames = games.filter((game) => game.won_game !== null);

  return (
    <div className="space-y-4">
      {/* Match details section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase text-muted-foreground font-medium mb-1">
            Your Deck
          </p>
          <p className="font-medium">{yourDeck}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-muted-foreground font-medium mb-1">
            Opponent's Deck
          </p>
          <p className="font-medium">{oppDeck || "Unknown"}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-muted-foreground font-medium mb-1">
            Format
          </p>
          <p className="font-medium">{format || "Not specified"}</p>
        </div>

        <div>
          <p className="text-xs uppercase text-muted-foreground font-medium mb-1">
            Date
          </p>
          <p className="font-medium">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Game results section */}
      {playedGames.length > 0 && (
        <div>
          <div className="space-y-2 border-t pt-2">
            {playedGames.map((game, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-md border-b"
              >
                <div
                  className={`w-2 h-10 rounded-md ${
                    game.won_game ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />

                <div>
                  <div className="text-xs uppercase text-muted-foreground font-medium">
                    Game {game.game_number}
                  </div>

                  <div>
                    <span className="font-medium mr-2">
                      {game.won_game ? "Won" : "Lost"}
                    </span>

                    {game.started_play !== null && (
                      <span className="text-muted-foreground text-sm">
                        ({game.started_play ? "on the play" : "on the draw"})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes section - only show if provided */}
      {notes && (
        <div className="border-t pt-3">
          <p className="text-xs uppercase text-muted-foreground font-medium mb-1">
            Notes
          </p>
          <p className="text-sm">{notes}</p>
        </div>
      )}
    </div>
  );
}
