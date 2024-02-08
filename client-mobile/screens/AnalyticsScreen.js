import React from "react";

import { View } from "react-native";
import { Text, Button, Icon } from "@rneui/themed";

export default function AnalyticsScreen() {
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
          Analytics
        </Text>

        <Icon name="filter" size={24} color="white" type="ionicon" />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Icon name="build" size={48} color="white" type="ionicon" />
        <Text style={{ fontSize: 18, color: "white", marginTop: 16 }}>
          Page under construction
        </Text>
      </View>
    </View>
  );
}
