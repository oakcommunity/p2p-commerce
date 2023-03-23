import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import Config from "react-native-config";

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

export const getBalances = async (address) => {
  const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);
  const usdcContract = new ethers.Contract(
    USDC_CONTRACT_ADDRESS,
    USDC_ABI,
    provider
  );

  const maticBalance = await provider.getBalance(address);
  const usdcBalance = await usdcContract.balanceOf(address);

  return {
    matic: ethers.utils.formatEther(maticBalance),
    usdc: ethers.utils.formatUnits(usdcBalance, 6),
  };
};
