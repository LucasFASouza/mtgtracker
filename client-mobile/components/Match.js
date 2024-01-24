import React from "react";

import { View } from "react-native";
import { Text, Badge, Icon } from "@rneui/themed";

MOCK_DATA = {
  id: 7,
  tags: [
    {
      id: 2,
      tag: "Insomnia",
      user: 1,
    },
  ],
  your_deck: {
    id: 1,
    deck_name: "Mono U Terror",
    user: 1,
  },
  opp_deck: {
    id: 2,
    deck_name: "Kuldotha Burn",
    user: 1,
  },
  notes: "test 1",
  created_at: "2023-12-06T19:52:26.790161Z",
  matches: [
    {
      id: 4,
      result: "W",
      mulligans: 0,
      started_play: false,
      is_first_match: true,
    },
    {
      id: 5,
      result: "D",
      mulligans: 1,
      started_play: false,
      is_first_match: false,
    },
    {
      id: 6,
      result: "W",
      mulligans: 0,
      started_play: true,
      is_first_match: false,
    },
  ],
  user: 1,
};

const Match = (matchData) => {
  const [result, setResult] = React.useState("");
  const [color, setColor] = React.useState("");
  const match = matchData.match;

  React.useEffect(() => {
    let games = match.matches;
    let results = games.map((game) => game.result);

    let wins = 0;
    let losses = 0;

    results.forEach((result) => {
      if (result === "W") {
        wins += 1;
      } else if (result === "L") {
        losses += 1;
      }
    });

    setResult(wins + "-" + losses);
    setColor(wins > losses ? "#50FAA8" : wins < losses ? "#FA5075" : "#5F5F5F");
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderColor: "#5F5F5F",
        borderBottomWidth: 1,
      }}
    >
      <View style={{ width: "8%" }}>
        <Icon type="ionicon" name="ellipse" size={8} color={color} />
      </View>
      <Text
        style={{
          color: "white",
          width: "32%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {match.your_deck.deck_name}
      </Text>
      <Text
        style={{
          color: "white",
          width: "20%",
          fontWeight: "bold",
          fontSize: 22,
          textAlign: "center",
        }}
      >
        {result}
      </Text>
      <Text
        style={{
          color: "white",
          width: "32%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {match.opp_deck.deck_name}
      </Text>
      <View style={{ width: "8%" }}>
        <Icon type="ionicon" name="chevron-down" size={18} color="#5F5F5F" />
      </View>
    </View>
  );
};

export default Match;
