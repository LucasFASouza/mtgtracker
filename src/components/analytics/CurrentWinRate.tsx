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
    color: "hsl(var(--accent))",
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
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[162px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={360}
        innerRadius={70}
        outerRadius={115}
      >
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {winPercentage.toFixed(1)}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground text-sm"
                    >
                      Winrate
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="wins"
          stackId="a"
          fill="var(--color-wins)"
          className="stroke-transparent stroke-1"
        />
        <RadialBar
          dataKey="draws"
          fill="var(--color-draws)"
          stackId="a"
          className="stroke-transparent stroke-1"
        />
        <RadialBar
          dataKey="losses"
          fill="var(--color-losses)"
          stackId="a"
          className="stroke-transparent stroke-1"
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
