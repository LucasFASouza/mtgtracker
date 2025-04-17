"use client";
import { getMatches } from "@/actions/matchAction";
import Match from "@/components/history/Match";
import { match as matchSchema, game as gameSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FilterDrawer } from "@/components/FilterDrawer";

type ExtendedMatch = InferSelectModel<typeof matchSchema> & {
  games?: InferSelectModel<typeof gameSchema>[];
};

interface FilterOptions {
  format: string | null;
  deck: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

export default function MatchList() {
  const [matches, setMatches] = useState<ExtendedMatch[]>([]);
  const [allMatches, setAllMatches] = useState<ExtendedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<ExtendedMatch | null>(
    null
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    format: null,
    deck: null,
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        const data = await getMatches();
        setAllMatches(data);
      } catch (error) {
        console.error("Error fetching all matches:", error);
      }
    };

    fetchAllMatches();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await getMatches(activeFilters);
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [activeFilters]);

  const handleRowClick = (match: ExtendedMatch) => {
    setSelectedMatch(match);
    setDetailDialogOpen(true);
  };

  const getResultClass = (result: string | null) => {
    return result === "W"
      ? "bg-emerald-700"
      : result === "L"
      ? "bg-red-700"
      : "bg-neutral-700";
  };

  const getResultText = (result: string | null) => {
    return result === "W" ? "Win" : result === "L" ? "Loss" : "Draw";
  };

  const handleFiltersChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  // Group matches by date
  const groupMatchesByDate = (matches: ExtendedMatch[]) => {
    const groups: Record<string, ExtendedMatch[]> = {};

    matches.forEach((match) => {
      // Format date as YYYY-MM-DD in the local timezone
      const date = new Date(match.played_at);
      const dateStr = `
      ${date.getFullYear()}-
      ${(date.getMonth() + 1).toString().padStart(2, "0")}-
      ${date.getDate().toString().padStart(2, "0")}`;

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }

      groups[dateStr].push(match);
    });

    return Object.entries(groups)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateB).getTime() - new Date(dateA).getTime()
      ) // Sort by date descending
      .map(([date, matches]) => ({
        date,
        matches,
      }));
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

          <FilterDrawer
            matches={allMatches.length > 0 ? allMatches : matches}
            onFiltersChange={handleFiltersChange}
            currentFilters={activeFilters}
          />
        </div>

        {matches.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              {loading ? (
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              ) : (
                <p className="text-lg font-semibold text-muted-foreground mb-2">
                  No matches found with current filters. Try changing your
                  filters or register a match to see it here :)
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          groupMatchesByDate(matches).map(({ date, matches }) => (
            <div key={date} className="mb-6">
              <h3 className="text-sm text-muted-foreground font-medium mb-2">
                {new Date(date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <Table className="table-fixed">
                <TableBody>
                  {matches.map((match) => (
                    <TableRow
                      key={match.id}
                      onClick={() => handleRowClick(match)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <TableCell className="w-[16%]">
                        <Badge
                          className={`w-full ${getResultClass(match.result)}`}
                        >
                          {getResultText(match.result)}
                        </Badge>
                      </TableCell>

                      <TableCell className="w-[35%] truncate text-center">
                        {match.your_deck}
                      </TableCell>

                      <TableCell className="w-[14%] text-muted-foreground text-center font-bold">
                        {match.your_points} - {match.opp_points}
                      </TableCell>

                      <TableCell className="w-[35%] truncate text-center">
                        {match.opp_deck}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        )}
      </div>

      {/* Match Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent>
          <DialogTitle className="mb-4">Match details</DialogTitle>
          {selectedMatch && <Match match={selectedMatch} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
