import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { createWallet } from "../redux/store/users";

export default function OnboardScreen() {
  const dispatch = useDispatch();
  const [seedPhrase, setSeedPhrase] = useState("");

  return (
    <View style={styles.container}>
      <Text>OAK CURRENCY</Text>
      <Button
        title="Create New Wallet"
        onPress={() => dispatch(createWallet(""))}
      />
      <Text>Want to bring your own wallet?</Text>
      <Input
        label="Seed Phrase"
        placeholder="Input your Seed Phrase"
        value={seedPhrase}
        onChangeText={setSeedPhrase}
        autoCapitalize="none"
        secureTextEntry
      />
      <Button
        title="Import Wallet"
        onPress={() => dispatch(createWallet(seedPhrase))}
      />
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
