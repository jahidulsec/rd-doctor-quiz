import { cn } from "@/lib/utils";
import React from "react";

function Spinner({
  borderBottomColor = "border-b-primary",
  className,
}: {
  borderBottomColor?: string;
  className?: string;
}) {
  return (
    <div
      aria-label="Loading"
      className="relative inline-flex flex-col gap-2 items-center justify-center"
    >
      <div className={cn(`relative flex w-[2rem] aspect-square`, className)}>
        <span
          className={`absolute w-full h-full rounded-full animate-[spin_1s_ease_infinite] border-t-transparent border-l-transparent border-r-transparent border-3 ${borderBottomColor}`}
        ></span>
        <span
          className={`absolute w-full h-full rounded-full duration-[800ms] animate-[spin_1s_linear_infinite] border-dotted border-t-transparent border-l-transparent border-r-transparent border-3 ${borderBottomColor}`}
        ></span>
      </div>
    </div>
  );
}

export { Spinner };
