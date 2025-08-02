"use client";

import { useAccountBalance } from "@/hooks/use-account-balance";
import { useConnectionStatus } from "@/providers/connection-provider";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useMutation, useTypedApi } from "@reactive-dot/react";
import { useEffect, useState } from "react";

type TransactionBuilder<T = any> = (tx: T) => any;

export function useTxWithFees(
  txBuilder: TransactionBuilder,
  options?: { signer?: any },
) {
  const { selectedAccount } = useSelectedAccount();
  const { chainSpec, connectionStatus } = useConnectionStatus();
  const typedApi = useTypedApi(); // ← This suspends
  const accountBalance = useAccountBalance(); // ← This uses useLazyLoadQuery which suspends

  // Fee estimation state
  const [estimatedFees, setEstimatedFees] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation(txBuilder, {
    signer: options?.signer ?? selectedAccount?.polkadotSigner,
  });

  // Fee estimation effect - can work without selected account
  useEffect(() => {
    console.log("🔧 Fee estimation effect triggered", {
      txBuilder: !!txBuilder,
      typedApi: !!typedApi,
      connectionStatus,
      selectedAccount: selectedAccount?.address,
    });

    if (!txBuilder || !typedApi || connectionStatus !== "connected") {
      console.log("🚫 Missing requirements for fee estimation", {
        txBuilder: !!txBuilder,
        typedApi: !!typedApi,
        connectionStatus,
      });
      setEstimatedFees(null);
      setError(
        connectionStatus !== "connected" ? "Not connected to network" : null,
      );
      setIsLoading(false);
      return;
    }

    const estimateFees = async () => {
      try {
        console.log("🔄 Starting fee estimation...");
        setIsLoading(true);
        setError(null);
        const transaction = txBuilder(typedApi.tx);

        // Use a dummy address for fee estimation if no account selected
        // Fees are typically the same regardless of the address used for estimation
        const addressForEstimation =
          selectedAccount?.address ||
          "1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg"; // Generic Polkadot address

        console.log("📊 Estimating fees with address:", addressForEstimation);
        console.log("📊 Account selected:", !!selectedAccount?.address);

        const fees = await transaction.getEstimatedFees(addressForEstimation);
        console.log("✅ Fee estimation successful:", fees);

        if (fees === null || fees === undefined) {
          throw new Error("Fee estimation returned null/undefined");
        }

        setEstimatedFees(fees);
      } catch (err) {
        console.error("❌ Failed to estimate fees:", err);
        setError(
          `Failed to estimate fees: ${err instanceof Error ? err.message : String(err)}`,
        );
        setEstimatedFees(null);
      } finally {
        console.log("🏁 Fee estimation completed, isLoading -> false");
        setIsLoading(false);
      }
    };

    estimateFees();
  }, [txBuilder, typedApi, connectionStatus, selectedAccount?.address]);

  // Calculate if account has insufficient balance (only when account is selected)
  const hasInsufficientBalance =
    estimatedFees !== null &&
    selectedAccount?.address && // Only check balance when account is selected
    accountBalance?.free !== undefined &&
    accountBalance.free < estimatedFees;

  const fees = {
    estimatedFees,
    isLoading,
    error,
    hasInsufficientBalance,
    chainSpec,
  };

  return {
    mutation,
    fees,
  };
}
