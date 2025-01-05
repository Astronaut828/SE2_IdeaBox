import { useScaffoldWriteContract } from "./scaffold-eth/useScaffoldWriteContract";
import { Address, parseUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import { NETWORK_CONFIG } from "~~/utils/networks";

export const MERCHANT_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address;

export const useUSDCTransfer = () => {
  const { chain } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "USDC",
    chainId: chain?.id as 1 | 10 | 137 | 42161 | 8453 | 43114 | 56 | 250 | undefined,
  });

  const transferUSDC = async (amount: bigint) => {
    if (!chain) throw new Error("No wallet connected");
    if (!NETWORK_CONFIG[chain.id]?.usdcAddress) throw new Error("USDC not supported on this network");

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
