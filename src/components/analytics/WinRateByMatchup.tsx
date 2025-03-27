"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  TooltipProps as RechartsTooltipProps,
} from "recharts";
import { CardDescription } from "@/components/ui/card";

interface Match {
  id: string;
  result: string;
  format: string | null;
  your_deck: string | null;
  opp_deck: string | null;
  played_at: Date;
}

interface WinRateByMatchupProps {
  matches: Match[];
}

interface MatchupWinRate {
  name: string;
  winRate: number;
  matchCount: number;
}

const chartConfig = {
  winRate: {
    label: "Win Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface CustomTooltipProps
  extends Omit<RechartsTooltipProps<number, string>, "payload"> {
  payload?: Array<{
    value: number;
    payload: MatchupWinRate;
    dataKey: string;
  }>;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as MatchupWinRate;
    return (
      <ChartTooltipContent
        formatter={(value) =>
          typeof value === "number" ? `${value.toFixed(1)}%` : `${value}`
        }
        label={`Against ${label}`}
      >
        <div className="text-xs text-muted-foreground pt-1">
          Matches played: {data.matchCount}
        </div>
      </ChartTooltipContent>
    );
  }
  return null;
};

export function WinRateByMatchup({ matches }: WinRateByMatchupProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  const matchupData: Record<string, { wins: number; total: number }> = {};
  let totalWins = 0;
  let totalMatches = 0;

  matches.forEach((match) => {
    const oppDeck = match.opp_deck || "Unknown";

    if (!matchupData[oppDeck]) {
      matchupData[oppDeck] = { wins: 0, total: 0 };
    }

    matchupData[oppDeck].total += 1;
    totalMatches += 1;
    
    if (match.result === "W") {
      matchupData[oppDeck].wins += 1;
      totalWins += 1;
    }
  });

  const overallWinRate =
    totalMatches > 0 ? (totalWins / totalMatches) * 100 : 50;

  const chartData = Object.entries(matchupData)
    .map(([oppDeck, data]) => ({
      name: oppDeck,
      winRate: data.total > 0 ? (data.wins / data.total) * 100 : 0,
      matchCount: data.total,
    }))
    .sort((a, b) => b.winRate - a.winRate);

  if (chartData.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        Not enough matchup data available
      </div>
    );
  }

  const maxWinRate = Math.max(
    ...chartData.map((item) => Math.ceil(item.winRate / 10) * 10),
    100
  );

  return (
    <>
      <ChartContainer config={chartConfig} className="pr-5">
        <BarChart
          width={300}
          height={250}
          className="w-full"
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 5, left: 50, bottom: 5 }}
          barCategoryGap={6}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={true}
            className="stroke-muted"
          />
          
          <XAxis
            type="number"
            domain={[0, maxWinRate]}
            tickFormatter={(value) => `${value}%`}
            className="fill-muted-foreground text-xs"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={35}
            className="fill-muted-foreground text-xs"
            tickLine={false}
            axisLine={false}
            interval={0}
            tick={({ x, y, payload }) => {
              return (
                <text
                  x={x}
                  y={y}
                  dy={3}
                  textAnchor="end"
                  fill="currentColor"
                  fontSize="10px"
                  className="fill-muted-foreground"
                >
                  {payload.value}
                </text>
              );
            }}
          />
          <ReferenceLine
            x={50}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="3 3"
            label={{
              position: "top",
              value: "Overall",
              fill: "rgba(255,255,255,0.5)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="winRate" >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.winRate > 50 ? "#10b981" : "#ef4444"}
                radius={4}
              />
            ))}
          </Bar>
          <ChartTooltip content={<CustomTooltip />} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
