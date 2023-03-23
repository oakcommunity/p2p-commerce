import { StyleSheet, Text, View } from "react-native";
import React from "react";

const USDC_CONTRACT_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const USDC_ABI = [
  [
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
  ],
];
const POLYGON_RPC_URL =
  "https://polygon-mainnet.g.alchemy.com/v2/A0e9HJB-A_asv3HVauKvAqpIVHRgkaD-";

// 0xBA548749aC64615dCb038B09e255082c2428f329
// 10000

export default function HomeScreen() {
  const { walletData } = useSelector((state) => state.users);

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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
});
