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
          <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.2} />
        </div>
        <div className="relative z-10 py-8">
          <h3 className="text-2xl font-bold text-success mb-4">Payment Successful!</h3>
          <p className="text-sm mb-4">Thank you for your purchase!</p>
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

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) / 1e6 }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => console.error("Error:", err));
  }, [amount]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Elements
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
