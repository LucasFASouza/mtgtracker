"use client";

import {
  ChartConfig,
  ChartContainer,
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
} from "recharts";

interface WinRateByFormatProps {
  matches: Array<{
    id: string;
    format: string | null;
    result: "W" | "L" | "D";
  }>;
}

interface FormatWinRate {
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

// Custom tooltip component to include match count
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as FormatWinRate;
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

export function WinRateByFormat({ matches }: WinRateByFormatProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  // Process data to calculate win rates by format
  const formatData: Record<string, { wins: number; total: number }> = {};
  matches.forEach((match) => {
    const format = match.format || "Unknown";

    if (!formatData[format]) {
      formatData[format] = { wins: 0, total: 0 };
    }

    formatData[format].total += 1;
    if (match.result === "W") {
      formatData[format].wins += 1;
    }
  });

  // Prepare data for chart
  const chartData: FormatWinRate[] = Object.entries(formatData)
    .map(([format, data]) => ({
      name: format,
      winRate: (data.wins / data.total) * 100,
      matchCount: data.total,
    }))
    .filter((item) => item.matchCount >= 3) // Require at least 3 matches for meaningful data
    .sort((a, b) => b.winRate - a.winRate); // Sort by highest win rate

  const maxWinRate = Math.max(
    ...chartData.map((item) => Math.ceil(item.winRate / 10) * 10),
    100
  );

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 70, bottom: 10 }}
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
          width={60}
          className="fill-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          content={<CustomTooltip />}
        />
        <ReferenceLine
          x={50}
          stroke="rgba(255,255,255,0.2)"
          strokeDasharray="3 3"
        />
        <Bar dataKey="winRate">
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.winRate >= 50
                  ? "hsl(var(--chart-1))"
                  : "hsl(var(--chart-5))"
              }
              radius={4}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
