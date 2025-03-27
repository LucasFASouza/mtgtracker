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

interface WinRateByDeckProps {
  matches: Array<{
    id: string;
    your_deck: string | null;
    result: "W" | "L" | "D";
  }>;
}

interface DeckWinRate {
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
    payload: DeckWinRate;
    dataKey: string;
  }>;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DeckWinRate;
    return (
      <ChartTooltipContent
        formatter={(value) =>
          typeof value === "number" ? `${value.toFixed(1)}%` : `${value}`
        }
        label={label}
      >
        <div className="text-xs text-muted-foreground pt-1">
          Matches played: {data.matchCount}
        </div>
      </ChartTooltipContent>
    );
  }
  return null;
};

export function WinRateByDeck({ matches }: WinRateByDeckProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  const deckData: Record<string, { wins: number; total: number }> = {};
  let totalWins = 0;
  let totalMatches = 0;

  matches.forEach((match) => {
    const deck = match.your_deck || "Unknown";

    if (!deckData[deck]) {
      deckData[deck] = { wins: 0, total: 0 };
    }

    deckData[deck].total += 1;
    totalMatches += 1;

    if (match.result === "W") {
      deckData[deck].wins += 1;
      totalWins += 1;
    }
  });

  const overallWinRate =
    totalMatches > 0 ? (totalWins / totalMatches) * 100 : 50;

  const chartData: DeckWinRate[] = Object.entries(deckData)
    .map(([deck, data]) => ({
      name: deck,
      winRate: (data.wins / data.total) * 100,
      matchCount: data.total,
    }))
    .sort((a, b) => b.winRate - a.winRate);

  const maxWinRate = Math.max(
    ...chartData.map((item) => Math.ceil(item.winRate / 10) * 10),
    100
  );

  return (
    <ChartContainer config={chartConfig} className="pr-5">
      <BarChart
        width={300}
        height={250}
        className="w-full"
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 5, left: 30, bottom: 5 }}
        barCategoryGap={8}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
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
          x={overallWinRate}
          stroke="rgba(255,255,255,0.5)"
          strokeDasharray="3 3"
          label={{
            position: "top",
            value: "Overall",
            fill: "rgba(255,255,255,0.5)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="winRate" barSize={10}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`hsl(var(--chart-${(index % 5) + 1}))`}
              radius={4}
            />
          ))}
        </Bar>

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                return `${(value as number).toFixed(1)}%`;
              }}
            />
          }
        />
      </BarChart>
    </ChartContainer>
  );
}
