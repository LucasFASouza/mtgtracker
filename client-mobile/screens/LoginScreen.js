import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, Image } from "react-native";
import { Button, Text } from "@rneui/themed";
import Input from "../components/Input";

export default function LoginScreen({ navigation }) {
  const { login } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  function handleLogin() {
    let hasError = false;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      hasError = true;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setUsernameError("");
    setPasswordError("");

    let response = login({ username, password });
  }

  function handleUsernameBlur() {
    if (username.trim() === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  }

  function handlePasswordBlur() {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  }

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
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Hello, welcome back to
        </Text>
        <Text style={{ color: "#fa5075", fontSize: 20, fontWeight: "bold" }}>
          MTGTracker
        </Text>
      </View>

      <Input
        label="Username"
        value={username}
        onChangeText={setUsername}
        errorMessage={usernameError}
        onBlur={handleUsernameBlur}
      />

      <Input
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        errorMessage={passwordError}
        onBlur={handlePasswordBlur}
      />

      <View
        style={{
          marginVertical: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          title="Login"
          color={"#fa5075"}
          onPress={() => handleLogin({ username, password })}
          buttonStyle={{
            width: 200,
            height: 50,
            borderRadius: 7,
            marginBottom: 10,
          }}
          titleStyle={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />

        <Text style={{ color: "white", fontWeight: "bold" }}>
          Don't have an account?
        </Text>
        <Text
          style={{ color: "#fa5075", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
        </Text>
      </View>
    </View>
  );
}
