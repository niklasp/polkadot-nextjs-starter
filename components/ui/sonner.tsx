"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast, ToasterProps } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Apple, Loader2 } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, router]);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      icons={{
        loading: <Loader2 size={24} className="animate-spin text-current" />,
        info: <Apple size={24} className="text-current" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
