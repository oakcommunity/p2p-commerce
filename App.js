import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/Splash";
import HomeScreen from "./src/screens/Home";
import OnboardScreen from "./src/screens/Onboard";
import WalletScreen from "./src/screens/Wallet";
import QRScreen from "./src/screens/QR";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "./src/redux/store/users";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  // navigation
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  // state
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchSession());
  }, []);

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="QR" component={QRScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Enter OAK Wallet"
              component={OnboardScreen}
              options={{
                title: "Enter OAK Wallet",
                animationTypeForReplace: "push",
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}
