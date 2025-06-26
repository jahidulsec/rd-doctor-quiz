import { cn } from "@/lib/utils";
import { CircleOff, MessageCircleOff } from "lucide-react";
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

const NoQuizData = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 text-secondary/50 pointer-events-none min-h-50 justify-center items-center",
        className
      )}
      {...props}
    >
      <MessageCircleOff size={50} />
      <p className="text-xs font-medium mt-3">No Quiz for today</p>
    </div>
  );
};

export { NoData, NoQuizData };
