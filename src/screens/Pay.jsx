import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Keypad } from "../components";

const PayScreen = () => {
  const { height, width } = useWindowDimensions();
  const [paymentAmount, setPaymentAmount] = useState([0]);
  useEffect(() => {
    if (paymentAmount.length === 0) {
      setPaymentAmount("0");
    }
  }, [paymentAmount]);
  return (
    <SafeAreaView>
      <View
        style={[{ flexDirection: "column" }, { height: height, width: width }]}
      >
        <View
          style={{
            flexDirection: "row",
            top: 15,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginLeft: 15 }}> Arrow</Text>
          <Text style={{ fontWeight: "500" }}>Pay</Text>
          <Text style={{ marginRight: 15 }}>Gear</Text>
        </View>
        {/* End Header */}
        <View style={{ alignItems: "center", top: 100 }}>
          <Text style={{ fontSize: 60, fontWeight: "700" }}>{`$ ${parseFloat(
            paymentAmount
          )}`}</Text>
        </View>
        {/* End Amount Text */}
        <View style={{ top: 130, alignItems: "center" }}>
          <View
            style={{
              height: "28%",
              width: "85%",
              backgroundColor: "grey",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <View
              style={{
                marginLeft: 10,
                height: 50,
                width: 50,
                backgroundColor: "#fff",
                borderRadius: 100,
              }}
            ></View>
            <View style={{ flexDirection: "column", marginLeft: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>OAK</Text>
              <Text>Balance: $1024.39</Text>
            </View>
          </View>
        </View>
        {/* End BalanceBox*/}
        <View style={{ height: 370 }}>
          <Keypad setStateFunc={setPaymentAmount} />
        </View>
        {/* End Keypad */}
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Pressable
            style={{
              width: "80%",
              height: 40,
              backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 45,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "600" }}>
              Pay
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PayScreen;

const styles = StyleSheet.create({});
