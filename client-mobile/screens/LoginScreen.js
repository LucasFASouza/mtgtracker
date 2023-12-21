import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, TextInput, Image } from "react-native";
import { Button, Text, Input } from "@rneui/themed";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = React.useContext(AuthContext);

  return (
    <View
      style={{
        backgroundColor: "#2A0D2E",
        height: "100%",
        paddingHorizontal: "10%",
        paddingVertical: "42%",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 150, height: 150, marginBottom: 50 }}
      />

      <Input
        label="Username"
        inputStyle={{ color: "#FFF" }}
        labelStyle={{ color: "#FFF", marginHorizontal: 5 }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "rgba(255, 120, 200, 0.1)",
          paddingHorizontal: 8,
          borderRadius: 8,
          marginVertical: 6,
        }}
        value={username}
        onChangeText={setUsername}
      />

      <Input
        label="Password"
        inputStyle={{ color: "#FFF" }}
        labelStyle={{ color: "#FFF", marginHorizontal: 5 }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "rgba(255, 120, 200, 0.1)",
          paddingHorizontal: 8,
          borderRadius: 8,
          marginVertical: 6,
        }}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Login"
        color={"#fa5075"}
        onPress={() => login({ username, password })}
        buttonStyle={{
          width: 200,
          height: 50,
          borderRadius: 7,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />

      <Text style={{ color: "white" }}>Don't have an account?</Text>
      <Text
        style={{ color: "#fa5075" }}
        onPress={() => navigation.navigate("Register")}
      >
        Register here
      </Text>
    </View>
  );
}
