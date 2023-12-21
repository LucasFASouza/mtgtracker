import React from "react";

import { View, Text } from "react-native";
import MainHeader from "../components/MainHeader";

export default function TableScreen() {
  return (
    <View style={{ backgroundColor: "#55034b", height: 1000 }}>
      <MainHeader />
      <Text>Table Screen</Text>
    </View>
  );
}
