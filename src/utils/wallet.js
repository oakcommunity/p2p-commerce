import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

export const generateWallet = async (seedPhrase) => {
  const useSeed = seedPhrase !== "";
  var walletData = {
    address: "",
    privateKey: "",
    mnemonic: "",
  };
  try {
    var wallet;
    if (useSeed) {
      wallet = ethers.Wallet.fromMnemonic(seedPhrase);
    } else {
      wallet = ethers.Wallet.createRandom();
    }
    const generatedAddress = await wallet.getAddress();
    walletData = {
      address: generatedAddress,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
    return walletData;
  } catch (error) {
    console.error(error);
  }
  return walletData;
};

export function isValidSession(walletData) {
  if (
    !walletData ||
    walletData.address === "" ||
    walletData.privateKey === "" ||
    walletData.mnemonic === ""
  ) {
    return false;
  }
  return true;
}
