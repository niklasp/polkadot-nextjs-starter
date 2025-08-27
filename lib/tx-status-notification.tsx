import { ISubmittableResult } from "dedot/types";
import { Check, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { NetworkId } from "typink/types";

export function txStatusNotification(
  result: ISubmittableResult,
  toastId: string = "tx-status-notification",
  explorerUrl: string,
) {
  const { status } = result;

  const action = result.txHash
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
      });
      break;
    case "BestChainBlockIncluded":
      toast.message("Transaction included in best block", {
        id: toastId,
        icon: <Check className="mr-2 w-5 h-5 animate-pulse" />,
        action,
      });
      break;
    case "Finalized":
      toast.success("Transaction finalized", {
        id: toastId,
        icon: <CheckCheck className="mr-2 w-5 h-5" />,
        action,
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
