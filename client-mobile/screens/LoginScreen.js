import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, TextInput, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = React.useContext(AuthContext);

  return (
    <View style={{ backgroundColor: "#55034b", height: 1000 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Login"
        color={"#fa5075"}
        onPress={() => login({ username, password })}
      />

      <Text style={{ color: "white" }}>
        Don't have an account?
      </Text>
      <Text
        style={{ color: "#fa5075" }}
        onPress={() => navigation.navigate("Register")}
      >
        Register here
      </Text>
    </View>
  );
}
