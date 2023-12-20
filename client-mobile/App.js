import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChartsScreen from "./screens/ChartsScreen";
import TableScreen from "./screens/TableScreen";
import AddGameScreen from "./screens/AddGameScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  let isLoggedIn = false;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {isLoggedIn ? (
          <>
            <Tab.Screen name="Charts" component={ChartsScreen} />
            <Tab.Screen name="+" component={AddGameScreen} />
            <Tab.Screen name="Table" component={TableScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
