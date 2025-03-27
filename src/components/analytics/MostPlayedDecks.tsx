"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface Deck {
  name: string;
  value: number;
  color: string;
}

interface MostPlayedDecksProps {
  matches: Array<{
    id: string;
    your_deck: string | null;
  }>;
}

const chartConfig = {
  deck: {
    label: "Deck",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MostPlayedDecks({ matches }: MostPlayedDecksProps) {
  if (matches.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        No match data available
      </div>
    );
  }

  const deckCounts: Record<string, number> = {};
  matches.forEach((match) => {
    const deck = match.your_deck || "Unknown";
    deckCounts[deck] = (deckCounts[deck] || 0) + 1;
  });

  const totalMatches = matches.length;

  const colorPalette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const sortedDecks = Object.entries(deckCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  let chartData: Deck[] = [];

  if (sortedDecks.length > 5) {
    const topDecks = sortedDecks.slice(0, 4);

    const othersValue = sortedDecks
      .slice(4)
      .reduce((sum, deck) => sum + deck.value, 0);

    chartData = [
      ...topDecks.map((deck, index) => ({
        name: deck.name,
        value: deck.value,
        color: colorPalette[index],
      })),
      {
        name: "Others",
        value: othersValue,
        color: colorPalette[4],
      },
    ];
  } else {
    chartData = sortedDecks.map((deck, index) => ({
      name: deck.name,
      value: deck.value,
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
        margin={{ top: 15, right: 5, left: 5, bottom: 15 }}
      >
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
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
          formatter={(value) => (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        />
      </PieChart>
    </ChartContainer>
  );
}
