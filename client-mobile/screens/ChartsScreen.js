import React from "react";
import { Button, View, Text } from "react-native";

import { AuthContext } from "../services/AuthContext";

export default function ChartsScreen() {
  const { logout } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Charts Screen</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}
