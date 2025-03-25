type GreetingRule = {
  condition: (matchCount: number, winPercentage: number) => boolean;
  message: string;
};

const winrateGreetings: GreetingRule[] = [
  {
    condition: (matchCount) => matchCount < 5,
    message: "Registering more matches will give you better insights!",
  },
  {
    condition: (_, winPercentage) => winPercentage > 95,
    message:
      "Your LGS pray for your downfall. Their gods hide in fear of your power.",
  },
  {
    condition: (_, winPercentage) => winPercentage > 80,
    message: "You do know the meaning of 'pubstomping', right?",
  },
  {
    condition: (_, winPercentage) => winPercentage > 65,
    message: "Amazing winrate! Keep up the good work!",
  },
  {
    condition: (_, winPercentage) => winPercentage > 50,
    message: "You're doing well! Keep it up!",
  },
  {
    condition: (_, winPercentage) => winPercentage === 50,
    message: "Perfectly balanced, as all things should be.",
  },
  {
    condition: (_, winPercentage) => winPercentage > 35,
    message:
      "Almost there! Just keep practicing and soon enough more victories will come!",
  },
  {
    condition: (_, winPercentage) => winPercentage > 20,
    message:
      "We all start somewhere. Focus on the basics and you'll get there!",
  },
  {
    condition: () => true, // Default case
    message:
      "Don't worry. Sooner or later you'll win a match! (Maybe your opponent won't show up?)",
  },
];

export function getWinrateGreeting(
  matchCount: number,
  winCount: number
): string {
  const winPercentage = matchCount > 0 ? (winCount / matchCount) * 100 : 0;

  // Find the first matching rule
  const rule = winrateGreetings.find((rule) =>
    rule.condition(matchCount, winPercentage)
  );

  return rule?.message || "Hey :D";
}
