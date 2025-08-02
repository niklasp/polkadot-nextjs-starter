"use client";

import { useAccountBalance } from "@/hooks/use-account-balance";
import { useConnectionStatus } from "@/providers/connection-provider";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useMutation, useTypedApi } from "@reactive-dot/react";
import { useEffect, useState } from "react";

type TransactionBuilder<T = any> = (tx: T) => any;

export function useFees(
  txBuilder: TransactionBuilder,
  options?: { signer?: any },
) {
  const { selectedAccount } = useSelectedAccount();
  const { chainSpec } = useConnectionStatus();
  const typedApi = useTypedApi();
  const accountBalance = useAccountBalance();

  // Fee estimation state
  const [estimatedFees, setEstimatedFees] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fee estimation effect
  useEffect(() => {
    if (!txBuilder || !selectedAccount?.address || !typedApi) {
      setEstimatedFees(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const estimateFees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const transaction = txBuilder(typedApi.tx);
        const fees = await transaction.getEstimatedFees(
          selectedAccount.address,
        );
        setEstimatedFees(fees);
      } catch (err) {
        console.error("Failed to estimate fees:", err);
        setError("Failed to estimate fees");
        setEstimatedFees(null);
      } finally {
        setIsLoading(false);
      }
    };

    estimateFees();
  }, [txBuilder, selectedAccount?.address, typedApi]);

  // Calculate if account has insufficient balance
  const hasInsufficientBalance =
    estimatedFees !== null &&
    accountBalance?.free !== undefined &&
    accountBalance.free < estimatedFees;

  const fees = {
    estimatedFees,
    isLoading,
    error,
    hasInsufficientBalance,
    chainSpec,
  };

  return fees;
}
