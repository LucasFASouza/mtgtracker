import * as React from "react";
import * as SecureStore from "expo-secure-store";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Icon } from "@rneui/themed";

import { AuthContext } from "./services/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import AddGameScreen from "./screens/AddGameScreen";

import MainHeader from "./components/MainHeader";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        userToken = "ddfb13f5887055f30c578c898d6863f44dba845f"
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
        // Register via API
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
          <>
            <MainHeader />
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: "#FA5075",
                tabBarInactiveTintColor: "#5F5F5F",
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: "#282828",
                  borderTopColor: "#5F5F5F",
                },
                NavigationColor: "green",
              }}
            >
              <Tab.Screen
                name="Match History"
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon type="ionicon" name="list" size={24} color={color} />
                  ),
                }}
                component={HistoryScreen}
              />
              <Tab.Screen
                name="Add Match"
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon
                      type="ionicon"
                      name="add-circle"
                      size={24}
                      color={color}
                    />
                  ),
                }}
                component={AddGameScreen}
              />
              <Tab.Screen
                name="Analytics"
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon
                      type="ionicon"
                      name="analytics"
                      size={24}
                      color={color}
                    />
                  ),
                }}
                component={AnalyticsScreen}
              />
            </Tab.Navigator>
          </>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
