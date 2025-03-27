"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Funnel } from "@phosphor-icons/react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { match as matchSchema, game as gameSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { getUniqueFormats, getUniqueDecksForFormat } from "@/lib/matchUtils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type ExtendedMatch = InferSelectModel<typeof matchSchema> & {
  games?: InferSelectModel<typeof gameSchema>[];
};

interface FilterDrawerProps {
  matches: ExtendedMatch[];
  onFiltersChange?: (filters: {
    format: string | null;
    deck: string | null;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
  currentFilters?: {
    format: string | null;
    deck: string | null;
    startDate: Date | null;
    endDate: Date | null;
  };
}

export function FilterDrawer({
  matches,
  onFiltersChange,
  currentFilters,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(
    currentFilters?.format || "all"
  );
  const [selectedDeck, setSelectedDeck] = useState<string | null>(
    currentFilters?.deck || "all"
  );
  const [startDate, setStartDate] = useState<Date | null>(
    currentFilters?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    currentFilters?.endDate || null
  );
  const [filtersActive, setFiltersActive] = useState(
    !!(
      currentFilters?.format ||
      currentFilters?.deck ||
      currentFilters?.startDate ||
      currentFilters?.endDate
    )
  );

  useEffect(() => {
    setSelectedFormat(currentFilters?.format || "all");
    setSelectedDeck(currentFilters?.deck || "all");
    setStartDate(currentFilters?.startDate || null);
    setEndDate(currentFilters?.endDate || null);
    setFiltersActive(
      !!(
        currentFilters?.format ||
        currentFilters?.deck ||
        currentFilters?.startDate ||
        currentFilters?.endDate
      )
    );
  }, [currentFilters]);

  const formats = getUniqueFormats(matches);
  const decks =
    selectedFormat && selectedFormat !== "all"
      ? getUniqueDecksForFormat(matches, selectedFormat)
      : [];

  useEffect(() => {
    setSelectedDeck("all");
  }, [selectedFormat]);

  const handleStartDateChange = (date: Date | undefined) => {
    if (date && endDate && date > endDate) {
      setEndDate(null);
    }
    setStartDate(date || null); 
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date && startDate && date < startDate) {
      setStartDate(null);
    }
    setEndDate(date || null);
  };

  const handleApplyFilters = () => {
    const filters = {
      format: selectedFormat === "all" ? null : selectedFormat,
      deck: selectedDeck === "all" ? null : selectedDeck,
      startDate,
      endDate,
    };

    if (onFiltersChange) {
      onFiltersChange(filters);
    }

    setFiltersActive(
      !!(
        (selectedFormat && selectedFormat !== "all") ||
        (selectedDeck && selectedDeck !== "all") ||
        startDate ||
        endDate
      )
    );
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const filters = {
      format: null,
      deck: null,
      startDate: null,
      endDate: null,
    };

    setSelectedFormat("all");
    setSelectedDeck("all");
    setStartDate(null);
    setEndDate(null);
    setFiltersActive(false);

    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={filtersActive ? "bg-muted text-primary" : ""}
        >
          <Funnel weight={filtersActive ? "fill" : "regular"} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Matches</DrawerTitle>
          <DrawerDescription>
            Filter your matches by format, deck, and date range
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid gap-6 py-6 px-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Format & Deck</label>
            <div className="w-full flex items-center gap-2">
              <div className="w-1/2">
                <Select
                  value={selectedFormat || "all"}
                  onValueChange={(value: string) => setSelectedFormat(value)}
                >
                  <SelectTrigger id="format" className="w-full">
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Formats</SelectLabel>
                      <SelectItem value="all">All Formats</SelectItem>
                      {formats.map((format: string) => (
                        <SelectItem key={format} value={format}>
                          {format}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-1/2">
                <Select
                  value={selectedDeck || "all"}
                  onValueChange={(value: string) => setSelectedDeck(value)}
                  disabled={!selectedFormat || selectedFormat === "all"}
                >
                  <SelectTrigger id="deck" className="w-full">
                    <SelectValue
                      placeholder={
                        selectedFormat && selectedFormat !== "all"
                          ? "Select a deck"
                          : "Select a format first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Decks</SelectLabel>
                      <SelectItem value="all">All Decks</SelectItem>
                      {decks.map((deck: string) => (
                        <SelectItem key={deck} value={deck}>
                          {deck}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate || undefined}
                      onSelect={handleStartDateChange}
                      initialFocus
                      disabled={(date) => {
                        // Only disable dates after the end date
                        return endDate ? date > endDate : false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className="text-sm">to</span>

              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="end-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate || undefined}
                      onSelect={handleEndDateChange}
                      initialFocus
                      disabled={(date) => {
                        // Only disable dates before the start date
                        return startDate ? date < startDate : false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-between mt-4">
            <Button variant="outline" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
