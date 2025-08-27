import { useTx, NetworkId } from "typink";
import { TxButton } from "./tx-button";

export function RemarkButton({ networkId }: { networkId: NetworkId }) {
  const remarkTx = useTx((tx) => tx.system.remark, { networkId });

  return (
    <TxButton
      tx={remarkTx}
      args={["Hello, World from Polkadot Next.js Starter!"]}
      size="lg"
      networkId={networkId}
    >
      Create On Chain Remark
    </TxButton>
  );
}
