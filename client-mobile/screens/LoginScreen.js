import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, Image } from "react-native";
import { Text } from "@rneui/themed";

import Input from "../components/Input";
import Button from "../components/Button";

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
        backgroundColor: "#282828",
        height: "100%",
        paddingHorizontal: "10%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 165, height: 150, marginVertical: 30 }}
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
          marginTop: 40,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          title="Login"
          onPress={() => handleLogin({ username, password })}
        />

        <Text style={{ color: "#5F5F5F", fontWeight: "bold" }}>
          Don't have an account?
        </Text>
        <Text
          style={{ color: "white", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
        </Text>
      </View>
    </View>
  );
}
