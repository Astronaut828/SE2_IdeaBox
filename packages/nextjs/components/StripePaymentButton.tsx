"use client";

import { useEffect, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"initial" | "processing" | "succeeded" | "failed">("initial");

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
      <div className="text-center p-6">
        <h3 className="text-2xl font-bold text-success mb-4">Payment Successful!</h3>
        <p className="text-sm mb-4">Thank you for your payment</p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setStatus("initial");
            window.location.reload();
          }}
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <PaymentElement />
      {error && <div className="text-error text-sm mt-2">{error}</div>}
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary mt-4 w-full">
        {loading ? <span className="loading loading-spinner loading-sm"></span> : "Pay $0.55"}
      </button>
    </form>
  );
};

export const StripePaymentButton = () => {
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => console.error("Error:", err));
  }, []);

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
      <CheckoutForm />
    </Elements>
  );
};
