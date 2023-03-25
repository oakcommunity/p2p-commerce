import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
// import Config from "react-native-config";
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

  const fetchBalances = async () => {
    const fetchedBalances = await getBalances(walletData.address);
    setBalances(fetchedBalances);
  };

  useEffect(() => {
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

    const nonce = await wallet.getTransactionCount();
    const gasPrice = await provider.getGasPrice();
    const gasLimit = await usdcContract.estimateGas.transfer(
      recipientAddress,
      amountInWei
    );

    const transaction = {
      to: USDC_CONTRACT_ADDRESS,
      nonce,
      gasPrice,
      gasLimit,
      data: usdcContract.interface.encodeFunctionData("transfer", [
        recipientAddress,
        amountInWei,
      ]),
    };

    const transactionResponse = await wallet.sendTransaction(transaction);
    const transactionReceipt = await transactionResponse.wait();

    return transactionReceipt;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send USDC on Polygon</Text>
      <ScrollView contentContainerStyle={styles.inputContainer}>
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
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => sendUSDCTransaction(recipientAddress, amount)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Send USDC</Text>
          </Pressable>
          <Pressable onPress={fetchBalances} style={styles.button}>
            <Text style={styles.buttonText}>Fetch Balances</Text>
          </Pressable>
        </View>
        {balances && (
          <View style={styles.balances}>
            <Text style={styles.balanceText}>
              MATIC: {Math.round(balances.matic * 100) / 100}
            </Text>
            <Text style={styles.balanceText}>USDC: {balances.usdc}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "start",
    width: "100%",
    flexGrow: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    flexGrow: 0,
    alignSelf: "stretch",
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    flexGrow: 1,
    alignSelf: "stretch",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    flexGrow: 0,
    maxWidth: 200,
    alignSelf: "stretch",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 30,
    rowGap: 15,
    paddingVertical: 10,
    alignSelf: "stretch",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
  },
  balances: {
    marginTop: 20,
  },
  balanceText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
