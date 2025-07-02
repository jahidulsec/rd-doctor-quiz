import { cn } from "@/lib/utils";
import React from "react";

const StateSection = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-10 min-h-[50vh]",
        className
      )}
      {...props}
    />
  );
};

export { StateSection };
