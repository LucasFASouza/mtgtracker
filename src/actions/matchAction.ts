"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { match } from "@/db/schema";

export const getData = async () => {
  const data = await db.select().from(match);
  return data;
};

export const addMatch = async (
  result: "W" | "D" | "L",
  your_deck: string,
  opp_deck: string,
  notes: string
) => {
  await db.insert(match).values({
    result: result,
    your_deck: your_deck,
    opp_deck: opp_deck,
    notes: notes,
  });
};

export const deleteMatch = async (id: string) => {
  await db.delete(match).where(eq(match.id, id));

  revalidatePath("/");
};
