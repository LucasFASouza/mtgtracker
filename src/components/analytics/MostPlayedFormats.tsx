"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface Format {
  name: string;
  value: number;
  color: string;
}

interface MostPlayedFormatsProps {
  matches: Array<{
    id: string;
    format: string | null;
  }>;
}

const chartConfig = {
  format: {
    label: "Format",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MostPlayedFormats({ matches }: MostPlayedFormatsProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  const formatCounts: Record<string, number> = {};
  matches.forEach((match) => {
    const format = match.format || "Unknown";
    formatCounts[format] = (formatCounts[format] || 0) + 1;
  });

  const totalMatches = matches.length;

  const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const sortedFormats = Object.entries(formatCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  let chartData: Format[] = [];

  if (sortedFormats.length > 5) {
    const topFormats = sortedFormats.slice(0, 4);

    const othersValue = sortedFormats
      .slice(4)
      .reduce((sum, format) => sum + format.value, 0);

    chartData = [
      ...topFormats.map((format, index) => ({
        name: format.name,
        value: format.value,
        color: colorPalette[index],
      })),
      {
        name: "Others",
        value: othersValue,
        color: colorPalette[4],
      },
    ];
  } else {
    chartData = sortedFormats.map((format, index) => ({
      name: format.name,
      value: format.value,
      color: colorPalette[index % colorPalette.length],
    }));
  }

  chartData = chartData.map((item) => ({
    ...item,
    percentage: ((item.value / totalMatches) * 100).toFixed(1),
  }));

  return (
    <ChartContainer config={chartConfig}>
      <PieChart
        width={300}
        height={250}
        className="w-full"
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={70}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({ percentage }) => `${percentage}%`}
          labelLine={true}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                const percentage = (
                  ((value as number) / totalMatches) *
                  100
                ).toFixed(1);
                return `${name}: ${value} matches (${percentage}%)`;
              }}
            />
          }
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value, entry, index) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ChartContainer>
  );
}
