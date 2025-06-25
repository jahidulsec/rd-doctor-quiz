import { cn } from "@/lib/utils";
import React from "react";

const PageHeading = ({
  className,
  icon,
  children,
  ...props
}: React.ComponentProps<"div"> & { icon: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 [&_svg]:size-4 [&_svg]:fill-primary/20 [&_svg]:text-primary",
        className
      )}
      {...props}
    >
      {icon}
      <h1 className="font-medium text-xl">{children}</h1>
    </div>
  );
};

export { PageHeading };
