import { ISubmittableResult } from "dedot/types";
import { Check, CheckCheck, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { NetworkInfo } from "typink";

export function txStatusNotification(
  result: ISubmittableResult,
  toastId: string = "tx-status-notification",
  network: NetworkInfo | undefined,
) {
  const { status } = result;
  const explorerUrl = network?.subscanUrl ?? network?.pjsUrl;

  const action =
    result.txHash && explorerUrl
      ? {
          label: "View on explorer",
          onClick: () => {
            window.open(`${explorerUrl}/tx/${result.txHash}`, "_blank");
          },
        }
      : undefined;

  switch (status.type) {
    case "Broadcasting":
    case "Validated":
      toast.loading("Transaction submitted", {
        id: toastId,
        description: "Waiting for confirmation...",
      });
      break;
    case "BestChainBlockIncluded":
      toast.loading("Transaction included in block", {
        id: toastId,
        action,
        description: "Waiting for finalization...",
      });
      break;
    case "Finalized":
      toast.success("Transaction finalized", {
        id: toastId,
        icon: <CheckCheck className="w-5 h-5" />,
        action,
        description: "",
        duration: 10000,
        closeButton: true,
      });
      break;
    case "Invalid":
    case "Drop":
      toast.error(status.value.error, {
        id: toastId,
      });
      break;
    default:
      break;
  }
}
