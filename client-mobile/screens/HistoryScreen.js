import React from "react";

import { View } from "react-native";
import { Text, Icon } from "@rneui/themed";

import Match from "../components/Match";

export default function HistoryScreen() {
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
          Match History
        </Text>

        <Icon name="filter" size={24} color="white" type="ionicon" />
      </View>

      <Text
        style={{
          color: "#5F5F5F",
          fontSize: 16,
          fontWeight: "bold",
          marginHorizontal: 16,
          marginTop: 12,
        }}
      >
        Today
      </Text>
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 12,
          borderColor: "#5F5F5F",
          borderTopWidth: 1,
        }}
      >
        <Match />
        <Match />
        <Match />
        <Match />
      </View>
    </View>
  );
}