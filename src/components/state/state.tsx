import { cn } from "@/lib/utils";
import { CircleOff } from "lucide-react";
import React from "react";

const NoData = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 text-muted-foreground/50 pointer-events-none my-3 min-h-50 justify-center items-center",
        className
      )}
      {...props}
    >
      <CircleOff size={50} />
      <p className="text-xs">No data</p>
    </div>
  );
};

export { NoData };
