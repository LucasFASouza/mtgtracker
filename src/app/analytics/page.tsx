"use client";

import { useEffect, useState, useMemo } from "react";
import { getMatches } from "@/actions/matchAction";
import { CurrentWinRate } from "@/components/analytics/CurrentWinRate";
import { WinRateOverTime } from "@/components/analytics/WinRateOverTime";
import { MostPlayedFormats } from "@/components/analytics/MostPlayedFormats";
import { WinRateByFormat } from "@/components/analytics/WinRateByFormat";
import { getWinrateGreeting } from "@/lib/greetings";
import { FilterDrawer } from "@/components/analytics/FilterDrawer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { match as matchSchema, game as gameSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { MostPlayedDecks } from "@/components/analytics/MostPlayedDecks";
import { WinRateByDeck } from "@/components/analytics/WinRateByDeck";

type ExtendedMatch = InferSelectModel<typeof matchSchema> & {
  games?: InferSelectModel<typeof gameSchema>[];
};

interface FilterOptions {
  format: string | null;
  deck: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

export default function AnalyticsPage() {
  const [matches, setMatches] = useState<ExtendedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    format: null,
    deck: null,
    startDate: null,
    endDate: null,
  });
  const [allMatches, setAllMatches] = useState<ExtendedMatch[]>([]);

  useEffect(() => {
    async function loadAllMatches() {
      try {
        const matchData = await getMatches();
        setAllMatches(matchData);
      } catch (error) {
        console.error("Error loading all matches:", error);
      }
    }

    loadAllMatches();
  }, []);

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        const matchData = await getMatches(activeFilters);
        console.log("Fetched matches:", matchData);
        setMatches(matchData);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [activeFilters]);

  if (loading) {
    return (
      <div className="container flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const winCount = matches.filter((match) => match.result === "W").length;
  const lossCount = matches.filter((match) => match.result === "L").length;
  const drawCount = matches.filter((match) => match.result === "D").length;

  const greeting = getWinrateGreeting(matches.length, winCount);

  const handleFiltersChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Match History</h2>

        <FilterDrawer
          matches={allMatches.length > 0 ? allMatches : matches}
          onFiltersChange={handleFiltersChange}
          currentFilters={activeFilters}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col justify-center gap-2">
            <p className="text-sm font-bold">{greeting}</p>
            <p className="text-xs text-muted-foreground">
              Seeing analytic for {activeFilters.format || "all"} matches
              {activeFilters.deck && `,\n playing with ${activeFilters.deck}`}
              {activeFilters.startDate &&
                `,\n since ${activeFilters.startDate.toLocaleString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}`}
              {activeFilters.endDate &&
                `,\n up until ${activeFilters.endDate.toLocaleString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}`}
              .
            </p>
          </div>

          <CurrentWinRate
            winCount={winCount}
            lossCount={lossCount}
            drawCount={drawCount}
          />
        </div>

        <Card className="pb-2">
          <CardTitle className="pl-5">Winrate Over Time</CardTitle>
          <CardContent className="p-0">
            <WinRateOverTime matches={matches} />
          </CardContent>
        </Card>

        {/* Formats Analytics */}
        {!activeFilters.format && (
          <div>
            <Card className="pb-2">
              <CardTitle className="pl-5">Formats Analytics</CardTitle>
              <CardContent className="p-0">
                <div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Most Played Formats
                    </h3>
                    <MostPlayedFormats matches={matches} />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Win Rate by Format
                    </h3>
                    <WinRateByFormat matches={matches} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Decks Analytics */}
        {activeFilters.format && !activeFilters.deck && (
          <div>
            <Card className="pb-2">
              <CardTitle className="pl-5">Your Decks Analytics</CardTitle>
              <CardContent className="p-0">
                <div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Most Played Decks
                    </h3>
                    <MostPlayedDecks matches={matches} />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Win Rate by Deck
                    </h3>
                    <WinRateByDeck matches={matches} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Overall charts
// DRAFTED - Current win rate (RadialBarChart)
// DRAFTED - Win rate over time (AreaChart)
// DRAFTED - Most played formats (PieChart - Donut)
// DRAFTED - Win rate by format (BarChart - Horizontal)

// Format-specific charts
// TO DO - Most played decks (PieChart - Donut)
// TO DO - Win rate by deck (BarChart - Horizontal)
// TO DO - Most played opponents decks (PieChart - Donut)
// IDK - Win rate by opponent deck (BarChart - Horizontal)

// Deck-specific charts
// TO DO - Win rate by matchup (BarChart - Horizontal)
// TO DO - Most played matchups (PieChart - Donut)
// TO DO - Win rate on the play/draw (BarChart - Vertical maybe? Just text? Just show the difference? Punitiveness of starting on the draw)
// TO DO - Win rate game 1 vs game 2 and 3 (BarChart - Vertical maybe? Just text? Just show the difference? Effectiveness of sideboarding)

// Silly charts
// IDK - Time of day with most plays (RadarChart)
// IDK - Day of week with most plays (BarChart - Vertical)
