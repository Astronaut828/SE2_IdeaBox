import { useScaffoldWriteContract } from "./scaffold-eth/useScaffoldWriteContract";
import { Address, parseUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";

// Hardcoded USDC addresses for testing
export const USDC_ADDRESSES: { [chainId: number]: Address } = {
  1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as Address, // Mainnet
  10: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85" as Address, // Optimism
  137: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" as Address, // Polygon
  42161: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831" as Address, // Arbitrum
  8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address, // Base
  56: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" as Address, // BNB Chain
};

export const MERCHANT_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address;

export const useUSDCTransfer = () => {
  const { chain } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "USDC",
    chainId: chain?.id as 1 | 10 | 137 | 42161 | 8453 | undefined,
  });

  const transferUSDC = async (amount: bigint) => {
    if (!chain) throw new Error("No wallet connected");

    const usdcAmount = parseUnits(amount.toString(), 6);

    const txHash = await writeContractAsync({
      functionName: "transfer",
      args: [MERCHANT_ADDRESS, usdcAmount],
    });

    if (!txHash || !publicClient) return null;

    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    return {
      hash: txHash,
      receipt,
      amount: Number(amount),
      gasUsed: receipt.gasUsed,
      blockNumber: receipt.blockNumber,
      timestamp: new Date(),
    };
  };

  return { transferUSDC };
};
