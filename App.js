import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./src/screens/Splash";
import HomeScreen from "./src/screens/Home";
import OnboardScreen from "./src/screens/Onboard";
import WalletScreen from "./src/screens/Wallet";
import PayScreen from "./src/screens/Pay";
import QRScreen from "./src/screens/QR";
import LoginScreen from "./src/screens/Login";
import ProfileScreen from "./src/screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from "./src/redux/store/users";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./src/utils/supabase";

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

  // session + supabase
  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session get", session);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session change", session);
      setSession(session);
    });
  }, []);

  if (loading) {
    return <SplashScreen />;
  } else if (!session) {
    return <LoginScreen />;
  } else {
    return (
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Wallet" component={WalletScreen} />
            <Tab.Screen name="Pay" component={PayScreen} />
            <Tab.Screen name="QR" component={QRScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
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
