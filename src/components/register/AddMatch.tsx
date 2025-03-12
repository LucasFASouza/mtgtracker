"use client";
import React, { useState } from "react";
import { addMatch } from "@/actions/matchAction";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type GameData = {
  game_number: number;
  started_play: boolean;
  won_game: boolean;
};

interface MatchFormData {
  your_deck: string;
  opp_deck: string;
  format: string;
  notes: string;
}

export default function AddMatch() {
  const [newMatch, setNewMatch] = useState<MatchFormData>({
    your_deck: "",
    opp_deck: "",
    format: "",
    notes: "",
  });

  const [numberOfGames, setNumberOfGames] = useState<number>(2);

  const [games, setGames] = useState<GameData[]>([
    { game_number: 1, started_play: false, won_game: false },
    { game_number: 2, started_play: false, won_game: false },
    { game_number: 3, started_play: false, won_game: false },
  ]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const activeGames = games.slice(0, numberOfGames);

      await addMatch(
        newMatch.your_deck,
        newMatch.opp_deck,
        newMatch.format,
        newMatch.notes,
        activeGames
      );

      setNewMatch({
        your_deck: "",
        opp_deck: "",
        format: "",
        notes: "",
      });

      setGames([
        { game_number: 1, started_play: false, won_game: false },
        { game_number: 2, started_play: false, won_game: false },
        { game_number: 3, started_play: false, won_game: false },
      ]);

      setNumberOfGames(2);

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
    setNewMatch((prev: MatchFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGameChange = (
    index: number,
    field: keyof GameData,
    value: boolean
  ) => {
    setGames((prevGames: GameData[]) =>
      prevGames.map((game, i) =>
        i === index ? { ...game, [field]: value } : game
      )
    );
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-4">Register a New Match</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            name="format"
            value={newMatch.format}
            onChange={handleInputChange}
            placeholder="Standard, Modern, Commander, etc."
          />
        </div>

        <div className="space-y-2">
          <Label>Number of Games</Label>
          <RadioGroup
            value={numberOfGames.toString()}
            onValueChange={(value: string) => setNumberOfGames(parseInt(value))}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="games-1" />
              <Label htmlFor="games-1">1 Game</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="games-2" />
              <Label htmlFor="games-2">2 Games</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="games-3" />
              <Label htmlFor="games-3">3 Games</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3 border rounded-lg p-4">
          <h3 className="font-medium">Game Details</h3>

          {Array.from({ length: numberOfGames }).map((_, index) => (
            <Card key={index} className="mb-3">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">
                  Game {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`started-play-${index}`}
                      checked={games[index].started_play}
                      onCheckedChange={(checked: boolean | "indeterminate") =>
                        handleGameChange(
                          index,
                          "started_play",
                          checked === true
                        )
                      }
                    />
                    <Label htmlFor={`started-play-${index}`}>
                      I played first
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`won-game-${index}`}
                      checked={games[index].won_game}
                      onCheckedChange={(checked: boolean | "indeterminate") =>
                        handleGameChange(index, "won_game", checked === true)
                      }
                    />
                    <Label htmlFor={`won-game-${index}`}>I won this game</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
