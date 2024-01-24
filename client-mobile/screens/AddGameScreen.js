import React from "react";

import { View } from "react-native";
import { Text } from "@rneui/themed";

export default function AddGameScreen() {
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
    </View>
  );
}
