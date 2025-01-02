import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useUSDCTransfer } from "~~/hooks/useUSDCTransfer";
import { notification } from "~~/utils/scaffold-eth";
import { PaymentDetail, db } from "~~/utils/upstash_db";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: bigint;
}

export const PaymentModal = ({ isOpen, onClose, amount }: PaymentModalProps) => {
  const { address } = useAccount();
  const { user } = usePrivy();
  const { transferUSDC } = useUSDCTransfer();
  const [isLoading, setIsLoading] = useState(false);
  const publicClient = usePublicClient();

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!user || !address || !publicClient) return;

    setIsLoading(true);
    try {
      // Call transferUSDC and wait for transaction hash
      const txHash = await transferUSDC(amount);

      if (txHash) {
        // Get the transaction receipt
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        });

        // Only proceed if transaction was successful
        if (receipt.status === "success") {
          const userData = await db.readUser(user.id);
          if (!userData) return;

          const paymentDetail: PaymentDetail = {
            id: txHash,
            amount: Number(formatUnits(amount, 6)),
            currency: "USDC",
            status: receipt.status === "success" ? "succeeded" : "failed",
            type: "crypto",
            timestamp: new Date(),
            subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            subscriptionId: "",
            subscription: false,
            productId: "",
            productDownloaded: false,
          };

          userData.payments.unshift(paymentDetail);
          userData.payed = receipt.status === "success";
          await db.writeUser(user.id, userData);
          onClose();
        } else {
          throw new Error("Transaction failed");
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      notification.error("Payment failed: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-base-200 p-6 rounded-3xl shadow-xl z-10 w-96 max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Confirm Payment</h3>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-base-100 border border-base-300 rounded-3xl px-6 py-4 space-y-1">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Amount:</span>
                <span className="text-xl font-bold">{formatUnits(amount, 6)} USDC</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold">From:</span>
                <div className="flex items-center gap-2">
                  <Address address={address} />
                  <Balance address={address} className="text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="btn btn-ghost btn-sm px-6" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm px-6" onClick={handlePayment} disabled={isLoading}>
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
