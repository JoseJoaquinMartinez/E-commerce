"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProviderProps {
  children: React.ReactNode;
}
export const Providers = ({ children }: ProviderProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "EUR",
      }}
    >
      <SessionProvider>{children}</SessionProvider>;
    </PayPalScriptProvider>
  );
};
