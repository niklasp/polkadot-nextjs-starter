"use client";

import { cn } from "@/lib/utils";
import { useConnectionStatus } from "@/providers/connection-provider";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useAccountBalance } from "@/hooks/use-account-balance";
import { formatBalance } from "@/lib/format-balance";
import type { AsyncValue, MutationError } from "@reactive-dot/core";
import { useClient } from "@reactive-dot/react";
import { type VariantProps } from "class-variance-authority";
import { Check, CheckCheck, Loader2, PenLine, X } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";

type MutationState = AsyncValue<unknown, MutationError>;
type MutationResult = [MutationState, (...args: any[]) => any];

export function TxButton({
  children,
  tx,
  className,
  variant,
  size,
  disabled,
  resultDisplayDuration = 5000,
  withFees = true,
  icons = {
    default: <PenLine className="w-4 h-4" />,
    loading: <Loader2 className="w-4 h-4 animate-spin" />,
    finalized: <CheckCheck className="w-4 h-4 text-green-500" />,
    inBestBlock: <Check className="w-4 h-4 text-green-500 animate-pulse" />,
    error: <X className="w-4 h-4 text-red-500" />,
  },
  ...props
}: {
  children: React.ReactNode;
  tx: MutationResult;
  resultDisplayDuration?: number; // Duration in milliseconds to show result icons
  withFees?: boolean;
  icons?: {
    default?: React.ReactNode;
    loading?: React.ReactNode;
    finalized?: React.ReactNode;
    inBestBlock?: React.ReactNode;
    error?: React.ReactNode;
  };
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const { selectedAccount } = useSelectedAccount();
  const { connectionStatus } = useConnectionStatus();

  const [mutationState, execute] = tx;
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
          <div className="w-px h-4 bg-background mx-1" />
          {icons.loading}
        </>
      );
    }

    if (isFinalized && showResult) {
      return (
        <>
          {children}
          <div className="w-px h-4 bg-background mx-1" />
          {icons.finalized}
        </>
      );
    }

    if (isInBestBlock) {
      return (
        <>
          {children}
          <div className="w-px h-4 bg-background mx-1" />
          {icons.inBestBlock}
        </>
      );
    }

    if (isError && showResult) {
      return (
        <>
          {children}
          <div className="w-px h-4 bg-background mx-1" />
          {icons.error}
        </>
      );
    }

    // Show different text based on why it's disabled
    if (connectionStatus !== "connected") {
      return "Connect to Network";
    }

    if (!selectedAccount) {
      return "Select Account";
    }

    if (!selectedAccount?.polkadotSigner) {
      return "No Signer Available";
    }

    // Default state with signature icon to prevent layout shift
    return (
      <>
        {children}
        <div className="w-px h-4 bg-background mx-1" />
        {icons.default}
      </>
    );
  };

  return (
    <Button
      onClick={() => execute()}
      variant={variant}
      size={size}
      disabled={
        disabled ||
        isLoading ||
        connectionStatus !== "connected" ||
        !selectedAccount?.polkadotSigner
      }
      className={cn(isLoading && "cursor-not-allowed", className)}
      {...props}
    >
      {getButtonContent()}
    </Button>
  );
}
