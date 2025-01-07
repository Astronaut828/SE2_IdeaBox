import { Address, parseEther, parseUnits } from "viem";
import { erc20Abi } from "viem";
import { hardhat } from "viem/chains";
import { useAccount, usePublicClient } from "wagmi";
import { useWriteContract } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { NETWORK_CONFIG } from "~~/utils/networks";

export const MERCHANT_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" as Address;

export const useUSDCTransfer = () => {
  const { chain } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const writeTx = useTransactor();

  const transferUSDC = async (amount: bigint) => {
    if (!chain) throw new Error("No wallet connected");

    // For hardhat, send ETH directly instead of USDC
    if (chain.id === hardhat.id) {
      // Local hardhat ETH to USDC for testing - Adjusted so that 1 ETH = 1 USDC
      const usdcAmount = Number(amount) / 10 ** 6;

      const txHash = await writeTx({
        to: MERCHANT_ADDRESS,
        value: parseEther(usdcAmount.toString()),
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
    }

    // For other networks, continue with USDC
    const usdcAddress = NETWORK_CONFIG[chain.id]?.usdcAddress;
    if (!usdcAddress) throw new Error("USDC not supported on this network");

    const usdcAmount = parseUnits(amount.toString(), 6);

    const txHash = await writeContractAsync({
      address: usdcAddress,
      abi: erc20Abi,
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
