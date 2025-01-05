import { useEffect, useState } from "react";
import { USDC_ADDRESSES } from "./useUSDCTransfer";
import { formatUnits } from "viem";
import { erc20Abi } from "viem";
import { usePublicClient } from "wagmi";

export const useUSDCBalance = (address?: string, chainId?: number) => {
  const [balance, setBalance] = useState<string>("0");
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address || !chainId || !USDC_ADDRESSES[chainId] || !publicClient) {
        setBalance("0");
        return;
      }

      try {
        const data = await publicClient.readContract({
          address: USDC_ADDRESSES[chainId],
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
        });

        const formatted = formatUnits(data as bigint, 6);
        setBalance(Number(formatted).toFixed(2));
      } catch (error) {
        console.error("Error fetching USDC balance:", error);
        setBalance("0");
      }
    };

    fetchBalance();
  }, [address, chainId, publicClient]);

  return balance;
};
