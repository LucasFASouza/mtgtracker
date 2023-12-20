import React from "react";
import { Button, View, Text } from "react-native";

export default function LoginScreen() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const { login } = React.useContext(AuthContext);

    return (
        <View>
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
