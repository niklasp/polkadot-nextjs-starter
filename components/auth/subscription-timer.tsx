"use client";

import Countdown from "react-countdown";

export function SubscriptionTimer({
  validUntilTimestamp,
  onExpire,
}: {
  validUntilTimestamp: number;
  onExpire: () => void;
}) {
  return (
    <Countdown
      date={validUntilTimestamp}
      onComplete={onExpire}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>Subscription expired</span>;
        }
        return (
          <span className="tabular-nums font-mono text-polkadot-color">
            {days}d {hours}h {minutes}m {seconds}s
          </span>
        );
      }}
    />
  );
}
