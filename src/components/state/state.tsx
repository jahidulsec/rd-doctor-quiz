import { cn } from "@/lib/utils";
import {  MessageCircleOff } from "lucide-react";
import Image from "next/image";
import React from "react";

const NoData = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 text-muted-foreground/50 pointer-events-none my-3 justify-center items-center",
        className
      )}
      {...props}
    >
      <div className="relative w-20 aspect-square">
        <Image src={"/images/corrupted-file.png"} alt="" fill />
      </div>
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
      <p className="text-xs font-medium mt-3">Pl</p>
    </div>
  );
};

export { NoData, NoQuizData };
