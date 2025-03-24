import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Loader({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <motion.svg
      id="Logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 2000"
      fill="currentColor"
      width={`${size}px`}
      height={`${size}px`}
      className={cn(`ml-1 animate-spin-slow`, className)}
      initial={{ opacity: 0, width: 0, height: 0 }}
      animate={{
        opacity: 1,
        width: `${size}px`,
        height: `${size}px`,
      }}
      exit={{ opacity: 0, width: 0, height: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ellipse cx="1000" cy="441.78" rx="254.27" ry="147.95" />
      <ellipse cx="1000" cy="1556.15" rx="254.27" ry="147.95" />
      <ellipse
        cx="517.47"
        cy="720.38"
        rx="254.27"
        ry="147.95"
        transform="translate(-365.13 808.33) rotate(-60)"
      />
      <ellipse
        cx="1482.53"
        cy="1277.56"
        rx="254.27"
        ry="147.95"
        transform="translate(-365.13 1922.69) rotate(-60)"
      />
      <ellipse
        cx="517.47"
        cy="1277.56"
        rx="147.95"
        ry="254.27"
        transform="translate(-569.45 429.89) rotate(-30)"
      />
      <ellipse
        cx="1482.53"
        cy="720.38"
        rx="147.95"
        ry="254.27"
        transform="translate(-161.57 837.78) rotate(-30)"
      />
    </motion.svg>
  );
}
