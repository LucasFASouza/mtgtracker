import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, Image } from "react-native";
import { Button, Text } from "@rneui/themed";
import Input from "../components/Input";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { register } = React.useContext(AuthContext);

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
          Hello, welcome to
        </Text>
        <Text style={{ color: "#fa5075", fontSize: 24, fontWeight: "bold" }}>
          mtgtracker
        </Text>
      </View>

      <Input label="Username" value={username} onChangeText={setUsername} />
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        label="Confirm Password"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />

      <Button
        title="Register"
        color={"#fa5075"}
        onPress={() => register({ username, email, password })}
        buttonStyle={{
          width: 200,
          height: 50,
          borderRadius: 7,
          alignSelf: "center",
          marginVertical: 20,
        }}
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
