import { deleteMatch } from "@/actions/matchAction";
import { match } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Match = InferSelectModel<typeof match>;

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
        </div>
      </div>

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

      <div className="flex justify-end">
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
