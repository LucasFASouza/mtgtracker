import { deleteMatch } from "@/actions/matchAction";
import { match, game } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { Button } from "@/components/ui/button";
import MatchReview from "@/components/MatchReview";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const mappedGames =
    match.games?.map((game) => ({
      game_number: game.game_number,
      started_play: game.started_play,
      won_game: game.won_game,
    })) || [];

  return (
    <div className="space-y-4">
      <MatchReview
        yourDeck={match.your_deck}
        oppDeck={match.opp_deck || "Unknown"}
        format={match.format || ""}
        date={new Date(match.played_at)}
        games={mappedGames}
        notes={match.notes || ""}
      />

      <div className="flex justify-end mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This match will be permanently
                deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
