import React from "react";

import { View } from "react-native";
import { Text } from "@rneui/themed";

import Match from "./Match";

const MatchesGroup = (matches) => {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 12,
      }}
    >
      <Text
        style={{
          color: "#5F5F5F",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Today
      </Text>
      <View
        style={{
          marginVertical: 12,
          borderColor: "#5F5F5F",
          borderTopWidth: 1,
        }}
      >
        {matches.map((match) => {
          return <Match key={match.matches.id} match={match.matches} />;
        })}
      </View>
    </View>
  );
};

export default MatchesGroup;
