import { useTransactor } from "./scaffold-eth/useTransactor";
import { Address, parseEther } from "viem";
import { useWalletClient } from "wagmi";

// For local testing, use a hardhat default account as merchant
const MERCHANT_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address;

export const useUSDCTransfer = () => {
  const { data: walletClient } = useWalletClient();
  const transactor = useTransactor(walletClient);

  const transferUSDC = async (amount: bigint) => {
    if (!walletClient) throw new Error("No wallet connected");

    // Convert the USDC amount (6 decimals) to a regular number
    const usdcAmount = Number(amount) / 1_000_000;
    // Convert to ETH amount (18 decimals) using parseEther
    const ethAmount = parseEther(usdcAmount.toString());

    return transactor({
      to: MERCHANT_ADDRESS,
      value: ethAmount,
    });
  };

  return { transferUSDC };
};
