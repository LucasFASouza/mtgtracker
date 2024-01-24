import React from "react";

import { View } from "react-native";
import { Text, Badge, Icon } from "@rneui/themed";

const Match = () => {
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
        <Icon type="ionicon" name="ellipse" size={8} color="#50FAA8" />
      </View>
      <Text
        style={{
          color: "white",
          width: "32%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Mono U Terror
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
        2-1
      </Text>
      <Text
        style={{
          color: "white",
          width: "32%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Kuldotha Burn
      </Text>
      <View style={{ width: "8%" }}>
        <Icon type="ionicon" name="chevron-down" size={18} color="#5F5F5F" />
      </View>
    </View>
  );
};

export default Match;
