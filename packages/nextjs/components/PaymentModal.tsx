import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { Address, Balance } from "~~/components/scaffold-eth";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: bigint;
}

export const PaymentModal = ({ isOpen, onClose, amount }: PaymentModalProps) => {
  const { address } = useAccount();

  if (!isOpen) return null;

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
            <button className="btn btn-primary btn-sm px-6">Confirm Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};
