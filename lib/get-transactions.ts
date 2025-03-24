import { encodeAddress } from "@polkadot/util-crypto";

const SUBSCRIPTION_ADDRESS = process.env
  .NEXT_PUBLIC_SUBSCRIPTION_ADDRESS as string;

if (!SUBSCRIPTION_ADDRESS) {
  throw new Error("NEXT_PUBLIC_SUBSCRIPTION_ADDRESS is not set");
}

export async function getTransactionsFromAddress(accountAddress: string) {
  // encode the address to the substrate address format used by PAS or DOT, if you use other chains
  // you can find the correct prefix in the chain's documentation
  const encodedAddress = encodeAddress(accountAddress, 0);
  const endpoint = "https://paseo.api.subscan.io/api/v2/scan/transfers";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.SUBSCAN_API_KEY as string,
    },
    body: JSON.stringify({
      address: SUBSCRIPTION_ADDRESS,
      direction: "received",
      row: 100,
      page: 0,
      order: "desc",
      asset_symbol: "PAS",
    }),
  });

  console.log("response", response);

  const result = await response.json();
  console.log("result", result?.data?.transfers);
  const filtered = result?.data?.transfers?.filter(
    (tx: { from: string }) => tx.from === encodedAddress
  );
  console.log("filtered", filtered);
  return filtered?.map(
    (tx: { from: string; block_timestamp: number; amount: string }) => {
      return {
        timestamp: tx.block_timestamp,
        amount: tx.amount,
      };
    }
  );
}
