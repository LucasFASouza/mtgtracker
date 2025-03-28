"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

const chartConfig = {
  winRate: {
    label: "Win Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Match {
  id: string;
  result: "W" | "L" | "D";
  played_at: Date;
}

interface WinRateOverTimeProps {
  matches: Match[];
  startDate?: Date | null;
  endDate?: Date | null;
}

export function WinRateOverTime({
  matches,
  startDate,
  endDate,
}: WinRateOverTimeProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  const sortedMatches = [...matches].sort(
    (a, b) => a.played_at.getTime() - b.played_at.getTime()
  );

  let totalMatches = 0;
  let totalWins = 0;

  const dateMap = new Map<string, { date: string; winRate: number }>();

  for (const match of sortedMatches) {
    totalMatches++;
    if (match.result === "W") totalWins++;

    const winRate = (totalWins / totalMatches) * 100;
    const date = match.played_at.toISOString().split("T")[0];

    dateMap.set(date, {
      date,
      winRate: Number(winRate.toFixed(1)),
    });
  }

  let chartDataArray = Array.from(dateMap.values());

  // Filter displayed dates if date range is provided
  if (startDate || endDate) {
    chartDataArray = chartDataArray.filter((item) => {
      const itemDate = new Date(item.date);

      if (startDate && endDate) {
        return itemDate >= startDate && itemDate <= endDate;
      } else if (startDate) {
        return itemDate >= startDate;
      } else if (endDate) {
        return itemDate <= endDate;
      }

      return true;
    });
  }

  // If filtered array is empty but we have matches, show a message
  if (chartDataArray.length === 0 && matches.length > 0) {
    return (
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        No matches within the selected date range
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        width={500}
        height={300}
        data={chartDataArray}
        margin={{ top: 0, right: 15, left: 0, bottom: 0 }}
        className="w-full"
      >
        <defs>
          <linearGradient id="winRateGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={chartConfig.winRate.color}
              stopOpacity={0.8}
            />
            <stop
              offset="90%"
              stopColor={chartConfig.winRate.color}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="date"
          className="fill-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
          interval={Math.ceil(chartDataArray.length / 6)}
          tickFormatter={(date) => {
            return new Date(date).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis
          className="fill-muted-foreground text-xs"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
        />
        <ReferenceLine
          y={50}
          stroke="rgba(255,255,255,0.2)"
          strokeDasharray="3 3"
        />
        <Tooltip
          content={
            <ChartTooltipContent
              formatter={(value) => `${value}%`}
              labelFormatter={(date) =>
                new Date(date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }
            />
          }
        />
        <Area
          type="monotone"
          dataKey="winRate"
          name="Win Rate"
          stroke={chartConfig.winRate.color}
          fillOpacity={1}
          fill="url(#winRateGradient)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
