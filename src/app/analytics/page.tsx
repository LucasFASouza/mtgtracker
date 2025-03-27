import { getMatches } from "@/actions/matchAction";
import { CurrentWinRate } from "@/components/analytics/CurrentWinRate";
import { WinRateOverTime } from "@/components/analytics/WinRateOverTime";
import { MostPlayedFormats } from "@/components/analytics/MostPlayedFormats";
import { WinRateByFormat } from "@/components/analytics/WinRateByFormat";
import { getWinrateGreeting } from "@/lib/greetings";
import { Button } from "@/components/ui/button";
import { Funnel } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function AnalyticsPage() {
  const matches = await getMatches();

  const winCount = matches.filter((match) => match.result === "W").length;
  const lossCount = matches.filter((match) => match.result === "L").length;
  const drawCount = matches.filter((match) => match.result === "D").length;

  const greeting = getWinrateGreeting(matches.length, winCount);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Match History</h2>

        <Button variant="outline" size="icon">
          <Funnel />
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="flex-1 flex flex-col justify-around">
            <p className="text-sm text-muted-foreground pt-8">{greeting}</p>
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

        <div>
          <Card className="pb-2">
            <CardTitle className="pl-5">Format Analytics</CardTitle>
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
