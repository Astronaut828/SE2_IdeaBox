"use client";

import { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Confetti from "react-confetti";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ amount }: { amount: bigint }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"initial" | "processing" | "succeeded" | "failed">("initial");
  const [paymentData, setPaymentData] = useState<any>(null);

  const width = window.innerWidth * 2;
  const height = window.innerHeight * 2;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("processing");

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent.status === "succeeded") {
        setStatus("succeeded");
        setPaymentData(paymentIntent);
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
      setStatus("failed");
      console.error("Payment failed:", e);
    } finally {
      setLoading(false);
    }
  };

  if (status === "succeeded") {
    return (
      <div className="relative text-center min-h-[200px] w-full">
        <div className="absolute inset-0">
          <Confetti width={width} height={height} recycle={false} numberOfPieces={1200} gravity={0.2} />
        </div>
        <div className="relative z-10 py-8">
          <h3 className="text-2xl font-bold text-success mb-4">Payment Successful!</h3>

          {/* Receipt Style Payment Data Display */}
          {paymentData && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-base-200 opacity-50 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-semibold">Payment Receipt</h4>
                  <p className="text-sm opacity-60">{new Date(paymentData.created * 1000).toLocaleString()}</p>
                </div>

                <div className="divide-y divide-base-300">
                  <div className="py-3 flex justify-between">
                    <span className="text-sm opacity-75">Transaction ID</span>
                    <span className="text-sm font-mono">{paymentData.id.slice(-8)}</span>
                  </div>

                  <div className="py-3 flex justify-between">
                    <span className="text-sm opacity-75">Status</span>
                    <span className="badge badge-success">{paymentData.status}</span>
                  </div>

                  <div className="py-3 flex justify-between">
                    <span className="text-sm opacity-75">Payment Method</span>
                    <span className="capitalize">{paymentData.payment_method_types[0]}</span>
                  </div>

                  <div className="py-3 flex justify-between">
                    <span className="text-sm opacity-75">Currency</span>
                    <span className="uppercase">{paymentData.currency}</span>
                  </div>

                  <div className="py-4 flex justify-between items-center">
                    <span className="text-base font-semibold">Total Amount</span>
                    <span className="text-xl font-bold">${(paymentData.amount / 100).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm opacity-60 mb-4">Thank you for your purchase!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <PaymentElement />
      {error && <div className="text-error text-sm mt-2">{error}</div>}
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-4 w-full">
        {loading ? <span className="loading loading-spinner loading-sm"></span> : `Pay $${Number(amount) / 1e6}`}
      </button>
    </form>
  );
};

export const StripePaymentButton = ({ amount }: { amount: bigint }) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [stripeLoaded, setStripeLoaded] = useState(false);

  useEffect(() => {
    if (stripeLoaded) return; // Only load once

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) / 1e6 }),
    })
      .then(res => res.json())
      .then(data => {
        setClientSecret(data.clientSecret);
        setStripeLoaded(true);
      })
      .catch(err => console.error("Error:", err));
  }, [amount, stripeLoaded]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Elements
      key={clientSecret} // Add key to force re-render with new client secret
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <CheckoutForm amount={amount} />
    </Elements>
  );
};
