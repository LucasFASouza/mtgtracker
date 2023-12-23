import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, Image } from "react-native";
import { Button, Text } from "@rneui/themed";
import Input from "../components/Input"; 

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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 150, height: 150, marginBottom: 30 }}
      />

      <View style={{ width: "100%", paddingBottom: 30, paddingHorizontal: 8 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Hello, welcome back to
        </Text>
        <Text style={{ color: "#fa5075", fontSize: 24, fontWeight: "bold" }}>
          mtgtracker
        </Text>
      </View>

      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        label="Password"
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
          marginVertical: 20,
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
