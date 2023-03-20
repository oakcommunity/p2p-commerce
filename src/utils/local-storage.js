import * as SecureStore from "expo-secure-store";

export const ADDRESS = "oak-app-address";
export const PRIVATE_KEY = "oak-app-private-key";
export const MNEMONIC = "oak-app-mnemonic";

// SECURE STORE FUNCTIONS
export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result.toString();
  } else {
    return "";
  }
}

export async function deleteValueFor(key) {
  let result = await SecureStore.deleteItemAsync(key);
  if (result) {
    return result.toString();
  } else {
    return "";
  }
}

// WALLET STORE UTILITY FUNCTIONS
export async function saveWalletData(walletData) {
  const address = walletData.address;
  const privateKey = walletData.privateKey;
  const mnemonic = walletData.mnemonic;
  await save(ADDRESS, address);
  await save(PRIVATE_KEY, privateKey);
  await save(MNEMONIC, mnemonic);
  const payload = {
    address: address,
    privateKey: privateKey,
    mnemonic: mnemonic,
  };
  return payload;
}

export async function getWalletData() {
  const address = await getValueFor(ADDRESS);
  const privateKey = await getValueFor(PRIVATE_KEY);
  const mnemonic = await getValueFor(MNEMONIC);
  const payload = {
    address: address,
    privateKey: privateKey,
    mnemonic: mnemonic,
  };
  return payload;
}

export async function deleteWalletData() {
  const address = await deleteValueFor(ADDRESS);
  const privateKey = await deleteValueFor(PRIVATE_KEY);
  const mnemonic = await deleteValueFor(MNEMONIC);
  const payload = {
    address: address,
    privateKey: privateKey,
    mnemonic: mnemonic,
  };
  return payload;
}

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
