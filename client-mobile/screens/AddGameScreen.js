import React from "react";

import { View } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";
import Select from "../components/atoms/Select";

export default function AddGameScreen() {
  const [deckOptions, setDeckOptions] = React.useState([]);

  const [yourDeck, setYourDeck] = React.useState([]);
  const [oppDeck, setOppDeck] = React.useState([]);

  
  return (
    <View style={{ backgroundColor: "#282828", height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderColor: "#5F5F5F",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
          Add Match
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "white",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Let's add a new match!
        </Text>

        <View style={{ width: "80%", marginTop: 20 }}>
          <Select
            placeholder="Your Deck"
            data={deckOptions}
            value={yourDeck}
            onChange={(item) => {
              setYourDeck(item);
            }}
          />

          <Text style={{}}>VS</Text>

          <Select
            placeholder="Opponent's Deck"
            data={deckOptions}
            value={oppDeck}
            onChange={(item) => {
              setOppDeck(item);
            }}
          />
        </View>
      </View>
    </View>
  );
}
