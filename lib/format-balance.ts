// original source: https://github.com/polkadot-api/react-teleport-example/blob/main/src/lib/utils.ts

export const decimalSeparatorDisplay = ".";
export const decimalSeparatorsInput = [".", ","];
export const decimalSeparatorRegex = ",|.";

export type FormatCurrencyOptions = {
  nDecimals: number;
  padToDecimals: boolean;
  decimalSeparator: string;
};

const defaultOptions: FormatCurrencyOptions = {
  nDecimals: Infinity,
  padToDecimals: true,
  decimalSeparator: decimalSeparatorDisplay,
};

export const formatBalance = ({
  value,
  decimals,
  unit,
  options,
}: {
  value: bigint | null | undefined;
  decimals: number;
  unit?: string;
  options?: Partial<FormatCurrencyOptions>;
}): string => {
  const { nDecimals } = {
    ...defaultOptions,
    ...options,
  };
  if (value === null || value === undefined) return "";

  const precisionMultiplier = 10n ** BigInt(decimals);
  const isNegative = value < 0n;
  const absValue = isNegative ? value * -1n : value;

  const fullNumber = Number(absValue) / Number(precisionMultiplier);

  const formattedNumber = fullNumber.toFixed(
    nDecimals === Infinity ? decimals : nDecimals,
  );

  const finalNumber = isNegative ? `-${formattedNumber}` : formattedNumber;

  return unit ? `${finalNumber} ${unit}` : finalNumber;
};
