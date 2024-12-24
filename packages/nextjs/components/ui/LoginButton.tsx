"use client";

import React from "react";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

const LoginButton: React.FC = () => {
  const { ready, authenticated, login } = usePrivy();

  useEffect(() => {
    console.log("Privy Ready:", ready, "Authenticated:", authenticated);
  }, [ready, authenticated]);

  const disableLogin = !ready || authenticated;

  return (
    <button className="btn btn-primary btn-sm" onClick={login} disabled={disableLogin}>
      {!ready ? <span className="loading loading-spinner loading-xs"></span> : "Log in"}
    </button>
  );
};

export default LoginButton;
