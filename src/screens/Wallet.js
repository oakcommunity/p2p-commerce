import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text>OAK CURRENCY</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
});
