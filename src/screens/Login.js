import React, { useState } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../utils/supabase";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { walletData } = useSelector((state) => state.users);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: "+1" + phone,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
    setOtpLoading(true);
  }

  async function verifyOtp() {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: "+1" + phone,
      token: otp,
      type: "sms",
    });
    console.log(phone, otp, data, error);
    if (error) Alert.alert(error.message);
    setOtpLoading(false);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      {!otpLoading ? (
        <>
          <ScrollView style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Phone Number"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setPhone(text)}
              value={phone}
              placeholder="Phone Number"
              keyboardType={"number-pad"}
            />
          </ScrollView>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title="Get Started"
              disabled={loading}
              onPress={() => signIn()}
            />
          </View>
        </>
      ) : (
        <>
          <ScrollView style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="OTP"
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setOtp(text)}
              value={otp}
              placeholder="otp"
              keyboardType={"number-pad"}
            />
          </ScrollView>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Verify OTP" onPress={() => verifyOtp()} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 150,
    justifyContent: "center",
    flexDirection: "column",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
