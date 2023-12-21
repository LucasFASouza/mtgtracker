import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, TextInput, Text } from "react-native";
import { Button } from "@rneui/themed";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { register } = React.useContext(AuthContext);

  return (
    <View
      style={{
        backgroundColor: "#55034b",
        height: "100%",
        paddingHorizontal: "15%",
        paddingVertical: "50%",
      }}
    >
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />

      <Button
        title="Register"
        color={"#fa5075"}
        onPress={() => register({ username, password })}
      />

      <Text style={{ color: "white" }}>Already have an account?</Text>
      <Text
        style={{ color: "#fa5075" }}
        onPress={() => navigation.navigate("Login")}
      >
        Login here
      </Text>
    </View>
  );
}
