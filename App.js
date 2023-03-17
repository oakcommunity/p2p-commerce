import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { Transaction } from "@ethersproject/transactions";

export default function App() {
  const [privateKey, setPrivateKey] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [value, setValue] = useState("");
  const [signedTransaction, setSignedTransaction] = useState("");
  const [generatedWallet, setGeneratedWallet] = useState(null);

  const createWallet = () => {
    try {
      const wallet = ethers.Wallet.createRandom();
      setGeneratedWallet(wallet);
      console.log("wallet", wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const signTransaction = async () => {
    try {
      const wallet = new ethers.Wallet(privateKey);
      const nonce = await wallet.getTransactionCount();
      const gasPrice = await wallet.provider.getGasPrice();
      const transaction = {
        to: toAddress,
        value: ethers.utils.parseEther(value),
        nonce,
        gasPrice,
        gasLimit: 21000,
      };
      const signedTx = await wallet.signTransaction(transaction);
      setSignedTransaction(signedTx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>OAK CURRENCY</Text>
      <Button title="Create Wallet" onPress={createWallet} />
      {generatedWallet ? (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Generated Wallet:</Text>
          <Text selectable style={styles.resultValue}>
            Address: {generatedWallet.address}
          </Text>
          <Text selectable style={styles.resultValue}>
            Private Key: {generatedWallet.privateKey}
          </Text>
        </View>
      ) : null}
      <Input
        label="Private Key"
        placeholder="Enter your private key"
        value={privateKey}
        onChangeText={setPrivateKey}
        autoCapitalize="none"
        secureTextEntry
      />
      <Input
        label="To Address"
        placeholder="Enter the recipient's address"
        value={toAddress}
        onChangeText={setToAddress}
        autoCapitalize="none"
      />
      <Input
        label="Value (ETH)"
        placeholder="Enter the amount to send"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <Button title="Sign Transaction" onPress={signTransaction} />
      {signedTransaction ? (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Signed Transaction:</Text>
          <Text selectable style={styles.resultValue}>
            {signedTransaction}
          </Text>
        </View>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
