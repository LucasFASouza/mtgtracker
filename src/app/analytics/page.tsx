import { getMatches } from "@/actions/matchAction";
import { WinRateRadialChart } from "@/components/charts/WinRateRadialChart";

export default async function AnalyticsPage() {
  // Fetch data directly on the server
  const matches = await getMatches();

  // Calculate statistics
  const winCount = matches.filter((match) => match.result === "W").length;
  const lossCount = matches.filter((match) => match.result === "L").length;
  const drawCount = matches.filter((match) => match.result === "D").length;

  return (
    <div className="container py-4">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div>
        <WinRateRadialChart
          winCount={winCount}
          lossCount={lossCount}
          drawCount={drawCount}
        />
      </div>
    </div>
  );
}
