"use client";

import { Identicon as PolkadotIdenticon } from "@polkadot/react-identicon";

export function Identicon({
  address,
  size = 24,
}: {
  address: string;
  size?: number;
}) {
  return <PolkadotIdenticon value={address} theme="polkadot" size={size} />;
}
