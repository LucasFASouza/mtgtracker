"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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

import MatchReview from "@/components/MatchReview";

type GameDataInternal = {
  game_number: number;
  started_play: boolean | null;
  won_game: boolean | null;
};

interface MatchFormData {
  your_deck: string;
  opp_deck: string;
  format: string;
  notes: string;
}

export default function AddMatch() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [newMatch, setNewMatch] = useState<MatchFormData>({
    your_deck: "",
    opp_deck: "",
    format: "",
    notes: "",
  });

  const [games, setGames] = useState<GameDataInternal[]>([
    { game_number: 1, started_play: null, won_game: null },
  ]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Use a ref to store the deck placeholder so it doesn't change on re-renders
  const deckPlaceholderRef = useRef<string>("");

  if (!deckPlaceholderRef.current) {
    const decks = [
      "A commander that I cutted 40 lands from",
      "A draft deck that I added 20 lands to",
      "4c Bad Stuff",
      "Mono-tonous Control",
      "3 bombs in a trenchcoat",
      "Something borrowed",
      "Something blue",
      "Something old",
      "Something new",
      "60 goblins and a dream",
      "The first result in my netdecking",
    ];

    deckPlaceholderRef.current =
      decks[Math.floor(Math.random() * decks.length)];
  }

  // Get current game index (for steps 2, 3, 4 which represent games 0, 1, 2)
  const currentGameIndex = currentStep - 2;
  const isGameStep = currentStep > 1 && currentStep < 5;
  const isReviewStep = currentStep === 5;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMatch((prev: MatchFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGamePlayDrawChange = (gameIndex: number, playChoice: string) => {
    setGames((prevGames) =>
      prevGames.map((game, idx) =>
        idx === gameIndex
          ? {
              ...game,
              started_play:
                playChoice === "skip" ? null : playChoice === "play",
            }
          : game
      )
    );
  };

  const handleGameWinLossChange = (gameIndex: number, result: string) => {
    setGames((prevGames) =>
      prevGames.map((game, idx) =>
        idx === gameIndex
          ? {
              ...game,
              won_game: result === "skip" ? null : result === "win",
              started_play: result === "skip" ? null : game.started_play,
            }
          : game
      )
    );
  };

  const addAnotherGame = () => {
    if (currentGameIndex >= 0 && currentGameIndex < games.length) {
      const currentGame = games[currentGameIndex];

      if (currentGame.won_game === null) {
        skipToReview();
        return;
      }

      if (currentGameIndex === 1) {
        if (
          games[0].won_game === games[1].won_game &&
          games[0].won_game !== null
        ) {
          skipToReview();
          return;
        }
      }
    }

    if (games.length < 3 && games.length < currentGameIndex + 2) {
      let defaultOnPlay = null;

      if (games.length > 0 && games[games.length - 1].won_game !== null) {
        defaultOnPlay = games[games.length - 1].won_game === false;
      }

      setGames([
        ...games,
        {
          game_number: games.length + 1,
          started_play: defaultOnPlay,
          won_game: null,
        },
      ]);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const playedGames = games
        .filter((game) => game.won_game !== null)
        .map((game) => ({
          game_number: game.game_number,
          started_play: game.started_play,
          won_game: game.won_game === true,
        }));

      await addMatch(
        newMatch.your_deck,
        newMatch.opp_deck || "Unknown",
        newMatch.format,
        newMatch.notes,
        playedGames
      );

      router.push("/");
    } catch (error) {
      console.error("Error adding match:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep === 5) {
      setCurrentStep(1 + games.length);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipToReview = () => {
    setGames(games.slice(0, currentGameIndex + 1));
    setCurrentStep(5);
  };

  const renderStepContent = () => {
    // Step 1: Match Details
    if (currentStep === 1) {
      return (
        <div className="space-y-6 pt-24">
          <h2 className="text-xl font-semibold">Match Details</h2>
          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Input
              id="format"
              name="format"
              value={newMatch.format}
              onChange={handleInputChange}
              placeholder="Standard, Modern, Pauper, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="your_deck" required>
              Your Deck
            </Label>
            <Input
              id="your_deck"
              name="your_deck"
              value={newMatch.your_deck}
              onChange={handleInputChange}
              placeholder={deckPlaceholderRef.current}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="opp_deck">Opponent's Deck</Label>
            <Input
              id="opp_deck"
              name="opp_deck"
              placeholder="Unknown"
              value={newMatch.opp_deck}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full flex justify-end mt-4">
            <Button onClick={nextStep} disabled={!newMatch.your_deck}>
              Next
            </Button>
          </div>
        </div>
      );
    }

    // Steps 2-4: Game Details (one game per step)
    if (
      isGameStep &&
      currentGameIndex >= 0 &&
      currentGameIndex < games.length
    ) {
      const game = games[currentGameIndex];

      return (
        <div className="space-y-6 pt-24">
          <h2 className="text-xl font-semibold">
            About game {game.game_number}...
          </h2>

          <div className="space-y-2">
            <Label htmlFor={`win-loss-${currentGameIndex}`} required>
              Game result
            </Label>

            <Select
              value={
                game.won_game === null ? "skip" : game.won_game ? "win" : "loss"
              }
              onValueChange={(value) =>
                handleGameWinLossChange(currentGameIndex, value)
              }
            >
              <SelectTrigger
                id={`win-loss-${currentGameIndex}`}
                className="w-full"
              >
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="win">Won</SelectItem>
                <SelectItem value="loss">Lost</SelectItem>
                <SelectItem value="skip">Didn't play</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`play-draw-${currentGameIndex}`}>
              Did you started on the play or draw?
            </Label>

            <Select
              value={
                game.started_play === null
                  ? "skip"
                  : game.started_play
                  ? "play"
                  : "draw"
              }
              onValueChange={(value) =>
                handleGamePlayDrawChange(currentGameIndex, value)
              }
              disabled={game.won_game === null}
            >
              <SelectTrigger
                id={`play-draw-${currentGameIndex}`}
                className="w-full"
              >
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="play">On the play</SelectItem>
                <SelectItem value="draw">On the draw</SelectItem>
                <SelectItem value="skip">-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 space-y-8">
            <div className="w-full flex justify-between">
              <Button variant="secondary" onClick={prevStep}>
                Back
              </Button>

              <Button
                onClick={addAnotherGame}
                disabled={currentGameIndex === 0 && game.won_game === null}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Final Step: Review and Notes
    if (isReviewStep) {
      // Filter out games that weren't played for display
      const playedGames = games.filter((game) => game.won_game !== null);

      return (
        <div className="space-y-6 pt-10">
          <h2 className="text-xl font-semibold">Review and Notes</h2>

          <div className="border p-3 rounded-md">
            <MatchReview
              yourDeck={newMatch.your_deck}
              oppDeck={newMatch.opp_deck}
              format={newMatch.format}
              games={games}
            />
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={newMatch.notes}
              onChange={handleInputChange}
              placeholder="Any additional notes about the match..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button
              className="ml-auto"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Match"}
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold">Register Match</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {5}
          </div>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* {currentStep > 1 && (
          <div className="mt-2 flex justify-start">
            <Button variant="outline" size="icon" onClick={prevStep}>
              <ArrowBendUpLeft />
            </Button>
          </div>
        )} */}
      </div>

      {renderStepContent()}
    </div>
  );
}
