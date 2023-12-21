import React from "react";
import { AuthContext } from "../services/AuthContext";

import { View, TextInput } from "react-native";
import { Button } from "@rneui/themed";

export default function LoginScreen() {
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
        <Button title="Login" onPress={() => login({ username, password })} />
      </View>
    );
}
