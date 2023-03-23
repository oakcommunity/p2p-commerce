import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Config from "react-native-config";
import { getBalances } from "../utils/balanceOf";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { useSelector } from "react-redux";

const POLYGON_RPC_URL =
  "https://polygon-mainnet.g.alchemy.com/v2/A0e9HJB-A_asv3HVauKvAqpIVHRgkaD-";
const USDC_CONTRACT_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const USDC_ABI = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function HomeScreen() {
  const { walletData } = useSelector((state) => state.users);
  const [balances, setBalances] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchBalances = async () => {
      const fetchedBalances = await getBalances(walletData.address);
      setBalances(fetchedBalances);
    };
    fetchBalances();
  }, [walletData, walletData.address]);

  const sendUSDCTransaction = async (recipientAddress, amount) => {
    const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
    const wallet = new ethers.Wallet(walletData.privateKey, provider);

    const usdcContract = new ethers.Contract(
      USDC_CONTRACT_ADDRESS,
      USDC_ABI,
      wallet
    );
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 6);

    const transactionResponse = await usdcContract.transfer(
      recipientAddress,
      amountInWei
    );
    const transactionReceipt = await transactionResponse.wait();

    return transactionReceipt;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send USDC on Polygon</Text>
      <TextInput
        style={styles.input}
        onChangeText={setRecipientAddress}
        value={recipientAddress}
        placeholder="Recipient Address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Amount"
      />
      <Button
        onPress={() => sendUSDCTransaction(recipientAddress, amount)}
        title="Send USDC"
      />
      {balances && (
        <View style={styles.balances}>
          <Text style={styles.balanceText}>MATIC: {balances.matic}</Text>
          <Text style={styles.balanceText}>USDC: {balances.usdc}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  balances: {
    marginTop: 20,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
