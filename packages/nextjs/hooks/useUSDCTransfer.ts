import { useTransactor } from "./scaffold-eth/useTransactor";
import { Address, parseEther } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

// For local testing, use a hardhat default account as merchant
export const MERCHANT_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address; // Move to env variable

export const useUSDCTransfer = () => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const transactor = useTransactor(walletClient);

  const transferUSDC = async (amount: bigint) => {
    if (!walletClient) throw new Error("No wallet connected");

    // Convert the USDC amount (6 decimals) to a regular number
    const usdcAmount = Number(amount) / 1000000; // Adjusted for 6 decimals to reflect the actual amount per product
    // Convert to ETH amount (18 decimals) using parseEther
    const ethAmount = parseEther(usdcAmount.toString());

    const txHash = await transactor({
      to: MERCHANT_ADDRESS,
      value: ethAmount,
    });

    if (txHash && publicClient) {
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
      return {
        hash: txHash,
        receipt,
        amount: usdcAmount,
        gasUsed: receipt.gasUsed,
        blockNumber: receipt.blockNumber,
        timestamp: new Date(),
      };
    }

    return null;
  };

  return { transferUSDC };
};
