"use client";

import { ChainId } from "@reactive-dot/core";
// next.js with dynamic import with ssr disabled works
// https://nextjs.org/docs/pages/guides/lazy-loading#with-no-ssr

import dynamic from "next/dynamic";

// Dynamically import client components with ssr disabled
const ClientProviders = dynamic(
  () => import("./polkadot-provider").then((mod) => mod.PolkadotProvider),
  { ssr: false },
);

export function ClientProvider({
  children,
  defaultChainId = "polkadot",
}: {
  children: React.ReactNode;
  defaultChainId?: ChainId;
}) {
  return (
    <ClientProviders defaultChainId={defaultChainId}>
      {children}
    </ClientProviders>
  );
}
