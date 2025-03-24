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
      <div className="flex h-80 items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  // Process data to count formats
  const formatCounts: Record<string, number> = {};
  matches.forEach((match) => {
    const format = match.format || "Unknown";
    formatCounts[format] = (formatCounts[format] || 0) + 1;
  });

  // Colors from CSS variables
  const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  // Prepare data for chart
  const chartData: Format[] = Object.entries(formatCounts)
    .map(([name, value], index) => ({
      name,
      value,
      color: colorPalette[index % colorPalette.length],
    }))
    .sort((a, b) => b.value - a.value); // Sort by most played

  return (
    <ChartContainer config={chartConfig}>
      <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={
            <ChartTooltipContent formatter={(value) => `${value} matches`} />
          }
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value) => <span className="text-sm">{value}</span>}
        />
      </PieChart>
    </ChartContainer>
  );
}
