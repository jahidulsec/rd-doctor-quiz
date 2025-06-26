import { cn } from "@/lib/utils";
import React from "react";

function Spinner({
  borderBottomColor = "primary",
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
      <div className={cn(`relative flex w-[1rem] aspect-square`, className)}>
        <i
          className={`absolute w-full h-full rounded-full animate-spin duration-[800ms] ease-in-out border-t-transparent border-l-transparent border-r-transparent border-3 ${borderBottomColor}`}
        ></i>
        <i
          className={`absolute w-full h-full rounded-full opacity-100 duration-[800ms] animate-spin ease-linear border-dotted border-t-transparent border-l-transparent border-r-transparent border-3 ${borderBottomColor}`}
        ></i>
      </div>
    </div>
  );
}

export { Spinner };
