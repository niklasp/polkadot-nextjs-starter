import { useTx, NetworkId } from "typink";
import { TxButton } from "./tx-button";

export function RemarkButton({ networkId }: { networkId: NetworkId }) {
  const remarkTx = useTx((tx) => tx.system.remark, { networkId });

  return (
    <TxButton
      tx={remarkTx}
      args={["Hello, World from Polkadot Next.js Starter!"]}
      networkId={networkId}
      size="sm"
    >
      Create On Chain Remark
    </TxButton>
  );
}
