import React from "react";
import { Button, View, Text } from "react-native";

export default function ChartsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Charts Screen</Text>
      <Button
        title="Add new game"
        onPress={() => navigation.navigate("AddGame")}
      />
    </View>
  );
}
