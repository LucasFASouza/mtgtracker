"use client";
import { getData, addMatch } from "@/actions/matchAction";
import Match from "@/components/Match";
import { match as matchSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function MatchList() {
  const [matches, setMatches] = useState<
    InferSelectModel<typeof matchSchema>[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<InferSelectModel<
    typeof matchSchema
  > | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [newMatch, setNewMatch] = useState({
    result: "W" as "W" | "D" | "L",
    your_deck: "",
    opp_deck: "",
    notes: "",
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getData();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMatch(
      newMatch.result,
      newMatch.your_deck,
      newMatch.opp_deck,
      newMatch.notes
    );

    // Refresh matches list
    const data = await getData();
    setMatches(data);

    // Reset form
    setNewMatch({
      result: "W",
      your_deck: "",
      opp_deck: "",
      notes: "",
    });

    // Close dialog
    setDialogOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMatch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewMatch((prev) => ({
      ...prev,
      result: value as "W" | "D" | "L",
    }));
  };

  const handleRowClick = (match: InferSelectModel<typeof matchSchema>) => {
    setSelectedMatch(match);
    setDetailDialogOpen(true);
  };

  const getResultBadgeVariant = (result: string | null) => {
    return result === "W" ? "default" : result === "L" ? "sad" : "secondary";
  };

  const getResultText = (result: string | null) => {
    return result === "W" ? "Win" : result === "L" ? "Loss" : "Draw";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">MTG Match Tracker</h1>
        <p className="text-muted-foreground mt-1">
          Track your Magic: The Gathering match results
        </p>
      </div>

      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Match</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Match</DialogTitle>
              <DialogDescription>
                Record the details of your latest match
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="result">Result</Label>
                <Select
                  value={newMatch.result}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger id="result">
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="W">Win</SelectItem>
                    <SelectItem value="D">Draw</SelectItem>
                    <SelectItem value="L">Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="your_deck">Your Deck</Label>
                  <Input
                    id="your_deck"
                    name="your_deck"
                    value={newMatch.your_deck}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="opp_deck">Opponent's Deck</Label>
                  <Input
                    id="opp_deck"
                    name="opp_deck"
                    value={newMatch.opp_deck}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newMatch.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional notes about the match..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Add Match
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Match History</h2>
        {matches.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No matches recorded yet.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Result</TableHead>
                    <TableHead>Your Deck</TableHead>
                    <TableHead>Opponent's Deck</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {matches.map((match) => (
                    <TableRow
                      key={match.id}
                      onClick={() => handleRowClick(match)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <TableCell>
                        <Badge variant={getResultBadgeVariant(match.result)}>
                          {getResultText(match.result)}
                        </Badge>
                      </TableCell>
                      <TableCell>{match.your_deck}</TableCell>
                      <TableCell>{match.opp_deck}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Match Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogTitle>
            {selectedMatch?.your_deck}
            <span className="font-light text-muted-foreground"> vs </span>
            {selectedMatch?.opp_deck}
          </DialogTitle>
          {selectedMatch && <Match match={selectedMatch} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
