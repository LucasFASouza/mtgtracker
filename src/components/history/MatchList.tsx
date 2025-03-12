"use client";
import { getMatches } from "@/actions/matchAction";
import Match from "@/components/history/Match";
import { match as matchSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Funnel } from "@phosphor-icons/react/dist/ssr";

export default function MatchList() {
  const [matches, setMatches] = useState<
    InferSelectModel<typeof matchSchema>[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<InferSelectModel<
    typeof matchSchema
  > | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleRowClick = (match: InferSelectModel<typeof matchSchema>) => {
    setSelectedMatch(match);
    setDetailDialogOpen(true);
  };

  const getResultBadgeVariant = (result: string | null) => {
    return result === "W" ? "default" : result === "L" ? "sad" : "secondary";
  };

  const getResultText = (result: string | null) => {
    return result === "W" ? "Win" : result === "L" ? "Loss" : "Draw";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Match History</h2>

          <Button variant="outline" size="icon">
            <Funnel size={48} />
          </Button>
        </div>

        {matches.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Register a match to see it here :)
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="py-2">
            <CardContent className="px-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Result</TableHead>
                    <TableHead>Your Deck</TableHead>
                    <TableHead>Opponent's Deck</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {matches.map((match) => (
                    <TableRow
                      key={match.id}
                      onClick={() => handleRowClick(match)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <TableCell>
                        <Badge variant={getResultBadgeVariant(match.result)} className="w-full">
                          {getResultText(match.result)}
                        </Badge>
                      </TableCell>
                      <TableCell>{match.your_deck}</TableCell>
                      <TableCell>{match.opp_deck}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Match Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent>
          <DialogTitle>
            Match details
          </DialogTitle>
          {selectedMatch && <Match match={selectedMatch} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
