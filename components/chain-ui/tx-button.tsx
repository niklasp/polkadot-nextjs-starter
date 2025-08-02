"use client";

import { cn } from "@/lib/utils";
import { useConnectionStatus } from "@/providers/connection-provider";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { formatBalance } from "@/lib/format-balance";
import type { AsyncValue, MutationError } from "@reactive-dot/core";
import { type VariantProps } from "class-variance-authority";
import { Check, CheckCheck, Loader2, PenLine, X } from "lucide-react";
import * as React from "react";
import { Suspense, useEffect, useState, useCallback } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useMutation, useTypedApi } from "@reactive-dot/react";
import { useFees } from "@/hooks/use-fees";

type MutationState = AsyncValue<unknown, MutationError>;
type MutationResult = [MutationState, (...args: any[]) => any];

type FeesData = {
  estimatedFees: bigint | null;
  isLoading: boolean;
  error: string | null;
  hasInsufficientBalance: boolean;
  chainSpec: { tokenDecimals: number; tokenSymbol: string } | null;
};

type TxWithFeesResult = {
  mutation: MutationResult;
  fees: FeesData;
};

type TxButtonProps = {
  children: React.ReactNode;
  txWithFees?: TxWithFeesResult;
  tx?: MutationResult;
  fees?: FeesData;
  resultDisplayDuration?: number; // Duration in milliseconds to show result icons
  icons?: {
    default?: React.ReactNode;
    loading?: React.ReactNode;
    finalized?: React.ReactNode;
    inBestBlock?: React.ReactNode;
    error?: React.ReactNode;
  };
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function TxButton({
  children,
  tx,
  fees,
  txWithFees,
  className,
  variant,
  size,
  disabled,
  resultDisplayDuration = 5000,
  icons = {
    default: <PenLine className="w-4 h-4" />,
    loading: <Loader2 className="w-4 h-4 animate-spin" />,
    finalized: <CheckCheck className="w-4 h-4 text-green-500" />,
    inBestBlock: <Check className="w-4 h-4 text-green-500 animate-pulse" />,
    error: <X className="w-4 h-4 text-red-500" />,
  },
  ...props
}: TxButtonProps) {
  const { selectedAccount } = useSelectedAccount();
  const { connectionStatus } = useConnectionStatus();

  // Extract mutation and fees from either pattern
  const actualTx = txWithFees?.mutation || tx;
  const actualFees = txWithFees?.fees || fees;

  if (!actualTx) {
    throw new Error("TxButton requires either 'tx' or 'txWithFees' prop");
  }

  const [mutationState, execute] = actualTx;
  const [showResult, setShowResult] = useState(false);
  const getStateInfo = () => {
    if (!mutationState)
      return {
        isLoading: false,
        isInBestBlock: false,
        isFinalized: false,
        isError: false,
      };

    // Handle pending and broadcasting states
    const isLoading =
      (typeof mutationState === "symbol" &&
        mutationState.toString().includes("pending")) ||
      (mutationState !== null &&
        typeof mutationState === "object" &&
        !("message" in mutationState) &&
        typeof mutationState !== "symbol" &&
        ((mutationState as any).type === "signed" ||
          (mutationState as any).type === "broadcasted"));

    // Handle error states
    const isError =
      mutationState instanceof Error ||
      (mutationState !== null &&
        typeof mutationState === "object" &&
        "message" in mutationState);

    // Handle success states
    const isInBestBlock =
      mutationState !== null &&
      typeof mutationState === "object" &&
      !isError &&
      typeof mutationState !== "symbol" &&
      (mutationState as any).type === "txBestBlocksState";

    const isFinalized =
      mutationState !== null &&
      typeof mutationState === "object" &&
      !isError &&
      typeof mutationState !== "symbol" &&
      (mutationState as any).type === "finalized";

    return { isLoading, isInBestBlock, isFinalized, isError };
  };

  const { isLoading, isInBestBlock, isFinalized, isError } = getStateInfo();

  // Show result for specified duration then hide
  useEffect(() => {
    if (isInBestBlock || isFinalized || isError) {
      setShowResult(true);
      const timer = setTimeout(() => {
        setShowResult(false);
      }, resultDisplayDuration);

      return () => clearTimeout(timer);
    } else {
      setShowResult(false);
    }
  }, [isInBestBlock, isFinalized, isError, resultDisplayDuration]);

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          {children}

          {icons.loading}
        </>
      );
    }

    if (isFinalized && showResult) {
      return (
        <>
          {children}

          {icons.finalized}
        </>
      );
    }

    if (isInBestBlock) {
      return (
        <>
          {children}

          {icons.inBestBlock}
        </>
      );
    }

    if (isError && showResult) {
      return (
        <>
          {children}

          {icons.error}
        </>
      );
    }

    // // Show different text based on why it's disabled
    // if (connectionStatus !== "connected") {
    //   return "Connect to Network";
    // }

    // if (!selectedAccount) {
    //   return "Select Account";
    // }

    // if (!selectedAccount?.polkadotSigner) {
    //   return "No Signer Available";
    // }

    // Default state with signature icon to prevent layout shift
    return (
      <>
        {children}
        {icons.default}
      </>
    );
  };

  const isButtonDisabled =
    disabled ||
    isLoading ||
    connectionStatus !== "connected" ||
    !selectedAccount?.polkadotSigner ||
    actualFees?.hasInsufficientBalance ||
    actualFees?.isLoading; // Disable while fees are being estimated

  if (!actualFees) {
    return (
      <Button
        onClick={() => execute()}
        variant={variant}
        size={size}
        disabled={isButtonDisabled}
        className={cn(isLoading && "cursor-not-allowed", className)}
        {...props}
      >
        {getButtonContent()}
      </Button>
    );
  }

  return (
    <Suspense
      fallback={<TxButtonSkeleton {...props}>{children}</TxButtonSkeleton>}
    >
      <div className="inline-flex flex-col gap-1">
        <Button
          onClick={() => execute()}
          variant={variant}
          size={size}
          disabled={isButtonDisabled}
          className={cn(isLoading && "cursor-not-allowed", className)}
          {...props}
        >
          {getButtonContent()}
        </Button>

        <div className="text-xs text-muted-foreground font-medium h-4 flex items-center">
          {actualFees.estimatedFees !== null && actualFees.chainSpec ? (
            <span>
              Fee:{" "}
              {formatBalance({
                value: actualFees.estimatedFees,
                decimals: actualFees.chainSpec.tokenDecimals,
                unit: actualFees.chainSpec.tokenSymbol,
                nDecimals: 4,
              })}
              {actualFees.hasInsufficientBalance && (
                <span className="text-red-500 ml-1">
                  (Insufficient balance)
                </span>
              )}
              {!selectedAccount && (
                <span className="text-amber-500 ml-1">
                  (Connect wallet to execute)
                </span>
              )}
            </span>
          ) : actualFees.error ? (
            <span className="text-red-500">{actualFees.error}</span>
          ) : connectionStatus === "error" ? (
            <span>Fee estimation unavailable</span>
          ) : actualFees.isLoading ? (
            <div className="flex items-center">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Estimating fees...</span>
            </div>
          ) : (
            <span className="text-muted-foreground">
              Fee calculation pending...
            </span>
          )}
        </div>
      </div>
    </Suspense>
  );
}

export function TxButtonSkeleton({
  children,
  icons = {
    default: <PenLine className="w-4 h-4" />,
    loading: <Loader2 className="w-4 h-4 animate-spin" />,
    finalized: <CheckCheck className="w-4 h-4 text-green-500" />,
    inBestBlock: <Check className="w-4 h-4 text-green-500 animate-pulse" />,
    error: <X className="w-4 h-4 text-red-500" />,
  },
  ...props
}: TxButtonProps) {
  return (
    <div className="inline-flex flex-col gap-1">
      <Button disabled {...props}>
        {children}
        {icons.default}
      </Button>
      <div className="text-xs text-muted-foreground font-medium h-4 flex items-center">
        Establishing connection...
      </div>
    </div>
  );
}

// Internal component that uses suspending hooks
function TxButtonContent({
  txBuilder,
  children,
  ...props
}: {
  txBuilder: (tx: ReturnType<typeof useTypedApi>["tx"]) => any;
  children: React.ReactNode;
} & Omit<TxButtonProps, "tx" | "fees" | "txWithFees">) {
  const { selectedAccount } = useSelectedAccount();

  const mutation = useMutation(txBuilder, {
    signer: selectedAccount?.polkadotSigner,
  });
  const fees = useFees(txBuilder);

  return (
    <TxButton tx={mutation} fees={fees} {...props}>
      {children}
    </TxButton>
  );
}

// Suspending TxButton that handles its own suspense - defaults to useTypedApi["tx"] type
export function SuspendingTxButton({
  txBuilder,
  children,
  ...props
}: {
  txBuilder: (tx: ReturnType<typeof useTypedApi>["tx"]) => any;
  children: React.ReactNode;
  fallback?: React.ReactNode;
} & Omit<TxButtonProps, "tx" | "fees" | "txWithFees">) {
  return (
    <Suspense
      fallback={<TxButtonSkeleton {...props}>{children}</TxButtonSkeleton>}
    >
      <TxButtonContent txBuilder={txBuilder} {...props}>
        {children}
      </TxButtonContent>
    </Suspense>
  );
}
