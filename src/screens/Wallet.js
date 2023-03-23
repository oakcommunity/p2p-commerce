import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "../redux/store/users";

export default function WalletScreen() {
  const dispatch = useDispatch();
  const { walletData } = useSelector((state) => state.users);

  return (
    <View style={styles.container}>
      <Text>OAK CURRENCY</Text>
      <Text>Address: {walletData.address}</Text>
      <Text>Seed Phrase: {walletData.mnemonic}</Text>
      <Text>Private Key: {walletData.privateKey}</Text>
      <Button title="Delete Wallet" onPress={() => dispatch(deleteSession())} />
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
