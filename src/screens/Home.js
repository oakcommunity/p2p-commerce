import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HomeScreen() {
  const sendUSDCTransaction = async (wallet, recipientAddress, amount) => {
    const provider = ethers.getDefaultProvider("polygon");
    const connectedWallet = wallet.connect(provider);

    const usdcContract = new ethers.Contract(
      USDC_CONTRACT_ADDRESS,
      USDC_ABI,
      connectedWallet
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
