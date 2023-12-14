import React from "react";
import { Text, View } from "react-native";

export default function HomeScreen(props) {
    const { token } = props; // Access the token prop

    return (
        <View>
            <Text>Home Screen</Text>
            <Text>Token: {token}</Text>
        </View>
    );
}
