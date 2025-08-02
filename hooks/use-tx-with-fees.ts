"use client";

import { useAccountBalance } from "@/hooks/use-account-balance";
import { usePolkadotContext } from "@/providers/polkadot-provider";
import { useSelectedAccount } from "@/providers/selected-account-provider";
import { useMutation, useTypedApi } from "@reactive-dot/react";
import { useEffect, useState } from "react";

type TransactionBuilder<T = any> = (tx: T) => any;

export function useTxWithFees(
  txBuilder: TransactionBuilder,
  options?: { signer?: any },
) {
  const { selectedAccount } = useSelectedAccount();
  const { chainSpec } = usePolkadotContext();
  const typedApi = useTypedApi();
  const accountBalance = useAccountBalance();

  // Fee estimation state
  const [estimatedFees, setEstimatedFees] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation(txBuilder, {
    signer: options?.signer ?? selectedAccount?.polkadotSigner,
  });

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

  return {
    mutation,
    fees,
  };
}
