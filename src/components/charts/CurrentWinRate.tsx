"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RadialBarChart, RadialBar, PolarRadiusAxis, Label } from "recharts";

const chartConfig = {
  wins: {
    label: "Wins",
    color: "hsl(var(--chart-1))",
  },
  draws: {
    label: "Draws",
    color: "hsl(var(--chart-3))",
  },
  losses: {
    label: "Losses",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface WinRateRadialChartProps {
  winCount: number;
  lossCount: number;
  drawCount: number;
}

export function CurrentWinRate({
  winCount,
  lossCount,
  drawCount,
}: WinRateRadialChartProps) {
  const totalMatches = winCount + lossCount + drawCount;
  const winPercentage = totalMatches > 0 ? (winCount / totalMatches) * 100 : 0;

  const chartData = [
    {
      name: "Results",
      wins: winCount,
      draws: drawCount,
      losses: lossCount,
    },
  ];

  return (
    <ChartContainer config={chartConfig}>
      <RadialBarChart
        data={chartData}
        startAngle={180}
        endAngle={0}
        innerRadius={80}
        outerRadius={130}
        barSize={30}
      >
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {winPercentage.toFixed(1)}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-muted-foreground"
                    >
                      Win Rate
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="wins"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-wins)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="draws"
          fill="var(--color-draws)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="losses"
          fill="var(--color-losses)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
