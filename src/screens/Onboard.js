import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Input } from "react-native-elements";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers, selectAllUsers } from "../store/users";
import {
  saveWalletData,
  getWalletData,
  deleteWalletData,
} from "../utils/local-storage";

export default function OnboardScreen() {
  // const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state.users);
  // const users = useSelector(selectAllUsers);
  const [walletData, setWalletData] = useState({
    address: "",
    privateKey: "",
    mnemonic: "",
  });
  const [seedPhrase, setSeedPhrase] = useState("");

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  useEffect(() => {
    async function fetchKeys() {
      setWalletData(await getWalletData());
    }
    fetchKeys();
  }, []);

  const deleteWallet = async () => {
    setWalletData(await deleteWalletData());
  };

  const configureWallet = async (useSeed) => {
    try {
      var wallet;
      if (useSeed) {
        wallet = ethers.Wallet.fromMnemonic(seedPhrase);
      } else {
        wallet = ethers.Wallet.createRandom();
      }
      // store wallet information in encrypted keychain
      const generatedAddress = await wallet.getAddress();
      setWalletData(
        await saveWalletData(
          generatedAddress,
          wallet.privateKey,
          wallet.mnemonic.phrase
        )
      );

      if (useSeed) {
        console.log("successful wallet import");
      } else {
        console.log("successful wallet creation");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>OAK CURRENCY</Text>

      {walletData.address !== "" && walletData.privateKey !== "" ? (
        <>
          <Text>Address: {walletData.address}</Text>
          <Button title="Delete Wallet" onPress={deleteWallet} />
        </>
      ) : (
        <>
          <Button
            title="Create Wallet"
            onPress={() => configureWallet(false)}
          />
          <Input
            label="Seed Phrase"
            placeholder="Input your Seed Phrase"
            value={seedPhrase}
            onChangeText={setSeedPhrase}
            autoCapitalize="none"
            secureTextEntry
          />
          <Button title="Import Wallet" onPress={() => configureWallet(true)} />
        </>
      )}
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
