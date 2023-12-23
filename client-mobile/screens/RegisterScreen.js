import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, Image } from "react-native";
import { Button, Text } from "@rneui/themed";
import Input from "../components/Input";

export default function RegisterScreen({ navigation }) {
  const { register } = React.useContext(AuthContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [passwordConfirmError, setPasswordConfirmError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  function handleRegister() {
    let hasError = false;

    if (username.trim() === "") {
      setUsernameError("Username is required");
      hasError = true;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (passwordConfirm.trim() === "") {
      setPasswordConfirmError("Password confirmation is required");
      hasError = true;
    }

    if (passwordConfirm.trim() !== password.trim()) {
      setPasswordConfirmError("Password confirmation must match password");
      hasError = true;
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setUsernameError("");
    setPasswordError("");
    setPasswordConfirmError("");
    setEmailError("");

    let response = register({ username, email, password });
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

  function handlePasswordConfirmBlur() {
    if (passwordConfirm.trim() === "") {
      setPasswordConfirmError("Password confirmation is required");
    } else if (passwordConfirm.trim() !== password.trim()) {
      setPasswordConfirmError("Password confirmation must match password");
    } else {
      setPasswordConfirmError("");
    }
  }

  function handleEmailBlur() {
    if (email.trim() === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
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
        style={{ width: 100, height: 100, marginVertical: 30 }}
      />

      <View style={{ width: "100%", paddingBottom: 30, paddingHorizontal: 8 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Hello, welcome to
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
        label="Email"
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
        onBlur={handleEmailBlur}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        errorMessage={passwordError}
        onBlur={handlePasswordBlur}
      />
      <Input
        label="Confirm Password"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
        errorMessage={passwordConfirmError}
        onBlur={handlePasswordConfirmBlur}
      />

      <View
        style={{
          marginVertical: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          title="Register"
          color={"#fa5075"}
          onPress={() => handleRegister({ username, email, password })}
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
          Already have an account?
        </Text>
        <Text
          style={{ color: "#fa5075", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Login")}
        >
          Login here
        </Text>
      </View>
    </View>
  );
}
