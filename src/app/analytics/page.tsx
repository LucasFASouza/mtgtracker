import { getMatches } from "@/actions/matchAction";
import { CurrentWinRate } from "@/components/charts/CurrentWinRate";
import { WinRateOverTime } from "@/components/charts/WinRateOverTime";

export default async function AnalyticsPage() {
  const matches = await getMatches();

  const winCount = matches.filter((match) => match.result === "W").length;
  const lossCount = matches.filter((match) => match.result === "L").length;
  const drawCount = matches.filter((match) => match.result === "D").length;

  return (
    <div className="container py-4">
      <h2 className="text-xl font-semibold mb-6">Analytics</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-2">Overall Win Rate</h3>
          <CurrentWinRate
            winCount={winCount}
            lossCount={lossCount}
            drawCount={drawCount}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Win Rate Over Time</h3>
          <WinRateOverTime matches={matches} />
        </div>
      </div>
    </div>
  );
}
