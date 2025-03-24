export function calculateSubscriptionLength(
  transactions: {
    timestamp: number;
    amount: string;
  }[]
): number | null {
  if (!transactions.length) return null;

  console.log("xxx, transactions", transactions);

  const lastTransaction = transactions[0];
  const lastTransactionTimestamp = lastTransaction.timestamp * 1000;
  console.log(
    "xxx, lastTransaction Date",
    new Date(lastTransactionTimestamp).toLocaleString()
  );
  const amount = parseFloat(lastTransaction.amount);

  console.log("xxx, lastTransaction", lastTransaction);
  console.log("xxx, lastTransactionTimestamp", lastTransactionTimestamp);
  console.log("xxx, amount", amount);

  // Calculate validity duration in milliseconds (amount * 1 hour in ms)
  const validityDurationMs = amount * 60 * 60 * 1000;

  console.log("xxx, validityDurationMs", validityDurationMs);

  // Calculate the validity end timestamp
  const validUntilTimestamp = lastTransactionTimestamp + validityDurationMs;
  console.log("xxx, validUntilTimestamp", validUntilTimestamp);
  console.log("xxx, Date.now()", Date.now());
  console.log(
    "xxx, validUntilTimestamp < Date.now()",
    validUntilTimestamp < Date.now()
  );
  console.log(
    "xxx validUntilDate",
    new Date(validUntilTimestamp).toLocaleString()
  );
  if (validUntilTimestamp < Date.now()) return null;

  console.log("xxx, validUntilTimestamp", validUntilTimestamp);

  return validUntilTimestamp;
}
