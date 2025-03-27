import { InferSelectModel } from "drizzle-orm";
import { match as matchSchema, game as gameSchema } from "@/db/schema";

type ExtendedMatch = InferSelectModel<typeof matchSchema> & {
  games?: InferSelectModel<typeof gameSchema>[];
};

export function getUniqueFormats(matches: ExtendedMatch[]): string[] {
  const formats = new Set<string>();

  matches.forEach((match) => {
    if (match.format) {
      formats.add(match.format);
    }
  });

  return Array.from(formats).sort();
}

export function getUniqueDecksForFormat(
  matches: ExtendedMatch[],
  format: string
): string[] {
  const decks = new Set<string>();

  matches.forEach((match) => {
    if (match.format === format && match.your_deck) {
      decks.add(match.your_deck);
    }
  });

  return Array.from(decks).sort();
}
