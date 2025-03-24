"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useChain } from "@/providers/chain-provider";
import { MultiAddress } from "@/.papi/descriptors/dist";
import { usePolkadotExtension } from "@/providers/polkadot-extension-provider";
import { createTxNotificationHandler } from "@/lib/tx-notification-handler";
const SUBSCRIPTION_ADDRESS = process.env
  .NEXT_PUBLIC_SUBSCRIPTION_ADDRESS as string;

if (!SUBSCRIPTION_ADDRESS) {
  throw new Error("NEXT_PUBLIC_SUBSCRIPTION_ADDRESS is not set");
}

export default function SubscriptionForm() {
  const [dotValue, setDotValue] = useState(1);
  const [toggleValue, setToggleValue] = useState("1h");
  const { api } = useChain();
  const { activeSigner } = usePolkadotExtension();

  // Handle toggle group change
  const handleToggleChange = (value: string) => {
    if (!value) return; // Handle empty selection

    setToggleValue(value);

    // Update dotValue based on toggle selection
    switch (value) {
      case "1d":
        setDotValue(24); // 24 hours
        break;
      case "1w":
        setDotValue(168); // 7 days in hours
        break;
      case "1m":
        setDotValue(720); // ~30 days in hours
        break;
      case "1y":
        setDotValue(8760); // 365 days in hours
        break;
      default:
        setDotValue(1);
    }
  };

  // Convert DOT value to time (1 DOT = 1 hour)
  const totalHours = dotValue;
  const days = Math.floor(totalHours / 24);
  const hours = Math.floor(totalHours % 24);
  const minutes = Math.floor((totalHours * 60) % 60);

  const handleSubscribe = async () => {
    if (!activeSigner) {
      throw new Error("No active signer");
    }

    const tx = api?.tx.Balances.transfer_keep_alive({
      dest: MultiAddress.Id(SUBSCRIPTION_ADDRESS),
      value: BigInt(dotValue),
    });

    tx?.signSubmitAndWatch(activeSigner).subscribe(
      createTxNotificationHandler()
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Usage-Based Subscription</CardTitle>
        <CardDescription>Select your subscription duration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <ToggleGroup
              type="single"
              className="flex justify-between w-full"
              variant="outline"
              value={toggleValue}
              onValueChange={handleToggleChange}
            >
              <ToggleGroupItem value="1d" aria-label="Toggle 1d">
                1 Day
              </ToggleGroupItem>
              <ToggleGroupItem value="1w" aria-label="Toggle 1w">
                1 Week
              </ToggleGroupItem>
              <ToggleGroupItem value="1m" aria-label="Toggle 1m">
                1 Month
              </ToggleGroupItem>
              <ToggleGroupItem value="1y" aria-label="Toggle 1y">
                1 Year
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Amount Paid</span>
            <span className=" font-bold">{dotValue} DOT</span>
          </div>
          <Slider
            value={[dotValue]}
            min={0.05}
            max={8760} // Increased to accommodate 1 year in hours
            step={0.05}
            onValueChange={(value) => {
              setDotValue(value[0]);
              setToggleValue("custom"); // Reset toggle selection on manual slider change
            }}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.05 DOT</span>
            <span>8760 DOT</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="text-sm font-medium mb-2">Subscription duration:</div>
          <div className="text-2xl font-bold flex flex-wrap gap-2">
            {days > 0 && (
              <span className="flex items-baseline">
                {days}
                <span className="text-xs text-muted-foreground ml-1">days</span>
              </span>
            )}
            {hours > 0 && (
              <span className="flex items-baseline">
                {hours}
                <span className="text-xs text-muted-foreground ml-1">
                  hours
                </span>
              </span>
            )}
            {minutes > 0 && (
              <span className="flex items-baseline">
                {minutes}
                <span className="text-xs text-muted-foreground ml-1">min</span>
              </span>
            )}
            {days === 0 && hours === 0 && minutes === 0 && (
              <span className="flex items-baseline">
                0<span className="text-xs text-muted-foreground ml-1">min</span>
              </span>
            )}
          </div>
          <div className="text-xs mt-1 text-[var(--polkadot-pink)]/70">
            1 DOT = 1 hour of usage
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleSubscribe}>
          Subscribe Now
        </Button>
      </CardFooter>
    </Card>
  );
}
