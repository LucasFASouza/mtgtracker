"use client";

import { useEffect, useState } from "react";
import { getMatches } from "@/actions/matchAction";
import { CurrentWinRate } from "@/components/analytics/CurrentWinRate";
import { WinRateOverTime } from "@/components/analytics/WinRateOverTime";
import { MostPlayedFormats } from "@/components/analytics/MostPlayedFormats";
import { WinRateByFormat } from "@/components/analytics/WinRateByFormat";
import { getWinrateGreeting } from "@/lib/greetings";
import { FilterDrawer } from "@/components/FilterDrawer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { match as matchSchema, game as gameSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { MostPlayedDecks } from "@/components/analytics/MostPlayedDecks";
import { WinRateByDeck } from "@/components/analytics/WinRateByDeck";
import { WinRateByMatchup } from "@/components/analytics/WinRateByMatchup";
import { RecentWinRates } from "@/components/analytics/RecentWinRates";
import { PlayDrawWinrates } from "@/components/analytics/PlayDrawWinrates";
import { SideboardEffectiveness } from "@/components/analytics/SideboardEffectiveness";

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
  const [dateFilteredMatches, setDateFilteredMatches] = useState<
    ExtendedMatch[]
  >([]);
  const [dateUnfilteredMatches, setDateUnfilteredMatches] = useState<
    ExtendedMatch[]
  >([]);
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

        const formatDeckFilters = {
          format: activeFilters.format,
          deck: activeFilters.deck,
        };

        const unfilteredData = await getMatches(formatDeckFilters);
        setDateUnfilteredMatches(unfilteredData);

        if (activeFilters.startDate || activeFilters.endDate) {
          const allFilters = {
            ...formatDeckFilters,
            startDate: activeFilters.startDate,
            endDate: activeFilters.endDate,
          };

          const filteredData = await getMatches(allFilters);
          setDateFilteredMatches(filteredData);
        } else {
          setDateFilteredMatches(unfilteredData);
        }
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

  const winCount = dateFilteredMatches.filter(
    (match) => match.result === "W"
  ).length;
  const lossCount = dateFilteredMatches.filter(
    (match) => match.result === "L"
  ).length;
  const drawCount = dateFilteredMatches.filter(
    (match) => match.result === "D"
  ).length;

  const greeting = getWinrateGreeting(dateFilteredMatches.length, winCount);

  const handleFiltersChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Match History</h2>

        <FilterDrawer
          matches={allMatches.length > 0 ? allMatches : dateUnfilteredMatches}
          onFiltersChange={handleFiltersChange}
          currentFilters={activeFilters}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col justify-center gap-2">
            <p className="text-sm font-bold">{greeting}</p>
            <p className="text-xs text-muted-foreground">
              Seeing analytics for {activeFilters.format || "all"} matches
              {activeFilters.deck && `, played with ${activeFilters.deck}`}
              {activeFilters.startDate &&
                `, since ${activeFilters.startDate.toLocaleString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}`}
              {activeFilters.endDate &&
                `, up until ${activeFilters.endDate.toLocaleString("en-US", {
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
          <CardTitle className="pl-5">Cumulative Winrate</CardTitle>
          <CardContent className="p-0">
            <WinRateOverTime
              matches={dateUnfilteredMatches}
              startDate={activeFilters.startDate}
              endDate={activeFilters.endDate}
            />
          </CardContent>
        </Card>

        <Card className="pb-2">
          <CardTitle className="pl-5">Recent Performance</CardTitle>
          <CardContent className="p-0">
            <RecentWinRates matches={dateUnfilteredMatches} />
          </CardContent>
        </Card>

        {/* Overall Analytics */}
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
                    <MostPlayedFormats matches={dateFilteredMatches} />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Winrate by Format
                    </h3>
                    <WinRateByFormat matches={dateFilteredMatches} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Format Analytics */}
        {activeFilters.format && !activeFilters.deck && (
          <div>
            <Card className="pb-2">
              <CardTitle className="pl-5">
                Your {activeFilters.format} Decks
              </CardTitle>
              <CardContent className="p-0">
                <div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Most Played Decks
                    </h3>
                    <MostPlayedDecks matches={dateFilteredMatches} />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Winrate by Deck
                    </h3>
                    <WinRateByDeck matches={dateFilteredMatches} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Deck-specific */}
        {activeFilters.format && activeFilters.deck && (
          <div>
            <Card className="pb-2">
              <CardTitle className="pl-5">
                Matchup Analysis for {activeFilters.deck}
              </CardTitle>
              <CardContent className="p-0">
                <div className="p-2">
                  <h3 className="text-sm font-medium text-center mb-2">
                    Winrate by Matchup
                  </h3>
                  <WinRateByMatchup matches={dateFilteredMatches} />
                </div>

                <div className="p-2">
                  <h3 className="text-sm font-medium text-center mb-2">
                    Sideboard Effectiveness
                  </h3>
                  <SideboardEffectiveness
                    matches={dateFilteredMatches}
                    games={dateFilteredMatches.flatMap(
                      (match) => match.games || []
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6 mt-6">
              <Card className="pb-2">
                <CardTitle className="pl-5">Play vs Draw Analysis</CardTitle>
                <CardContent className="p-0">
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-center mb-2">
                      Winrate on Play vs Draw
                    </h3>
                    <PlayDrawWinrates
                      games={dateFilteredMatches
                        .flatMap((match) => match.games || [])
                        .filter((game) => game.started_play !== null)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Overall charts
// DONE - Current win rate (RadialBarChart)
// DONE - Win rate over time (AreaChart)
// DONE - Most played formats (PieChart - Donut)
// DONE - Win rate by format (BarChart - Horizontal)

// Format-specific charts
// DONE - Most played decks (PieChart - Donut)
// DONE - Win rate by deck (BarChart - Horizontal)
// IDK - Most played opponents decks (PieChart - Donut)
// IDK - Win rate by opponent deck (BarChart - Horizontal)

// Deck-specific charts
// DONE - Win rate by matchup (BarChart - Horizontal)
// IDK - Most played matchups (PieChart - Donut)
// TO DO - Win rate on the play/draw (BarChart - Vertical maybe? Just text? Just show the difference? Punitiveness of starting on the draw)
// TO DO - Win rate game 1 vs game 2 and 3 (BarChart - Vertical maybe? Just text? Just show the difference? Effectiveness of sideboarding)

// Silly charts
// IDK - Time of day with most plays (RadarChart)
// IDK - Day of week with most plays (BarChart - Vertical)
