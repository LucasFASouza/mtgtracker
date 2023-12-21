import * as React from "react";
import * as SecureStore from "expo-secure-store";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from "./services/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import ChartsScreen from "./screens/ChartsScreen";
import TableScreen from "./screens/TableScreen";
import AddGameScreen from "./screens/AddGameScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
          };
        case "LOGIN":
          return {
            ...prevState,
            isLoggedIn: true,
            userToken: action.token,
          };
        case "LOGOUT":
          return {
            ...prevState,
            isLoggedIn: false,
            userToken: null,
          };
      }
    },
    {
      isLoggedIn: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async (data) => {
        // Login via API
        console.log(data);

        dispatch({
          type: "LOGIN",
          token: "ddfb13f5887055f30c578c898d6863f44dba845f",
        });
      },
      logout: () => dispatch({ type: "LOGOUT" }),
      register: async (data) => {
        console.log(data);

        dispatch({
          type: "LOGIN",
          token: "ddfb13f5887055f30c578c898d6863f44dba845f",
        });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="Charts" component={ChartsScreen} />
            <Tab.Screen name="+" component={AddGameScreen} />
            <Tab.Screen name="Table" component={TableScreen} />
          </Tab.Navigator>
        ) : (
          <LoginScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
