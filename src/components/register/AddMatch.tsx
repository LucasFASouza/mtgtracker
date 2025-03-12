"use client";
import { useState } from "react";
import { addMatch, getMatches } from "@/actions/matchAction";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddMatch() {
  const [newMatch, setNewMatch] = useState({
    result: "W" as "W" | "D" | "L",
    your_deck: "",
    opp_deck: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addMatch(
        newMatch.result,
        newMatch.your_deck,
        newMatch.opp_deck,
        newMatch.notes
      );

      // Reset form
      setNewMatch({
        result: "W",
        your_deck: "",
        opp_deck: "",
        notes: "",
      });

      // Show success message
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding match:", error);
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Register a New Match</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="result">Result</Label>
          <Select value={newMatch.result} onValueChange={handleSelectChange}>
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Register Match"}
        </Button>

        {submitSuccess && (
          <div className="p-3 bg-green-100 text-green-800 rounded-md">
            Match registered successfully!
          </div>
        )}
      </form>
    </div>
  );
}
