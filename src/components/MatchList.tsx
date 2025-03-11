"use client";
import { getData, addMatch } from "@/actions/matchAction";
import Match from "@/components/Match";
import { match } from "@/db/schema";
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

export default function MatchList() {
  const [matches, setMatches] = useState<InferSelectModel<typeof match>[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newMatch, setNewMatch] = useState({
    id: 0,
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
      newMatch.id,
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
      id: 0,
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Match ID</Label>
                  <Input
                    id="id"
                    name="id"
                    type="number"
                    value={newMatch.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <Match key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
