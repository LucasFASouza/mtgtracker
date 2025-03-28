"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Match {
  id: string;
  result: "W" | "L" | "D";
  played_at: Date;
}

interface RecentWinRatesProps {
  matches: Match[];
}

interface TimePeriod {
  label: string;
  days: number;
  wins: number;
  total: number;
  winRate: number;
}

export function RecentWinRates({ matches }: RecentWinRatesProps) {
  // Define time periods
  const periods: TimePeriod[] = [
    {
      label: "Last Week",
      days: 7,
      wins: 0,
      total: 0,
      winRate: 0,
    },
    {
      label: "Last Month",
      days: 30,
      wins: 0,
      total: 0,
      winRate: 0,
    },
    {
      label: "Last 6 Months",
      days: 180,
      wins: 0,
      total: 0,
      winRate: 0,
    },
    {
      label: "Last Year",
      days: 365,
      wins: 0,
      total: 0,
      winRate: 0,
    },
  ];

  // Calculate stats for each time period
  if (matches.length > 0) {
    const now = new Date();

    periods.forEach((period) => {
      const cutoffDate = new Date(now);
      cutoffDate.setDate(cutoffDate.getDate() - period.days);

      const periodMatches = matches.filter(
        (match) => match.played_at >= cutoffDate
      );

      period.wins = periodMatches.filter(
        (match) => match.result === "W"
      ).length;
      period.total = periodMatches.length;
      period.winRate =
        period.total > 0 ? (period.wins / period.total) * 100 : 0;
    });
  }

  return (
    <div className="px-4 py-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Matches</TableHead>
            <TableHead className="text-right">Win Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {periods.map((period) => (
            <TableRow key={period.label}>
              <TableCell className="font-medium">{period.label}</TableCell>
              <TableCell className="text-right">{period.total}</TableCell>
              <TableCell
                className={`text-right ${
                  period.winRate > 50
                    ? "text-green-500"
                    : period.winRate < 50
                    ? "text-red-500"
                    : ""
                }`}
              >
                {period.winRate.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
