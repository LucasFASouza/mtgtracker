import { deleteMatch } from "@/actions/matchAction";
import { match } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Match = InferSelectModel<typeof match>;

interface MatchProps {
  match: Match;
}

export default function Match({ match }: MatchProps) {
  const handleDelete = async () => {
    await deleteMatch(match.id);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <h3 className="text-lg font-semibold">
            {match.your_deck} vs {match.opp_deck}
          </h3>
          <div className="flex items-center mt-1">
            <span className="text-sm text-muted-foreground mr-2">Result:</span>
            <Badge
              variant={
                match.result === "W"
                  ? "default"
                  : match.result === "L"
                  ? "destructive"
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
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </CardHeader>
      {match.notes && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Notes:</span> {match.notes}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
