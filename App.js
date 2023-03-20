import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/Splash";
import HomeScreen from "./src/screens/Home";
import OnboardScreen from "./src/screens/Onboard";
import WalletScreen from "./src/screens/Wallet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useSelector } from "react-redux";
import { getWalletData, isValidSession } from "./src/utils/local-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  // const { isLoggedIn } = useSelector((state) => state.isLoggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchKeys() {
      setIsLoggedIn(await isValidSession());
      setIsLoading(false);
    }
    fetchKeys();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {isLoggedIn ? (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Onboard" component={OnboardScreen} />
              <Tab.Screen name="Wallet" component={WalletScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Onboard"
                component={OnboardScreen}
                options={{
                  title: "Sign in",
                  animationTypeForReplace: "push",
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </Provider>
    );
  }
}
