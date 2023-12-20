import React from "react";
import { Button, View, Text } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
