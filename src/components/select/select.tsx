"use client";

import React from "react";
import {
  Select as SelectUi,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const Select = ({
  data,
  className,
  placeholder,
  id,
  ...props
}: React.ComponentProps<React.FC<SelectProps>> & {
  className?: string;
  placeholder?: string;
  id?: string;
  data: { label: string; value: string }[];
}) => {
  return (
    <SelectUi {...props}>
      <SelectTrigger
        className={cn("[&_svg]:text-primary bg-background", className)}
      >
        <SelectValue id={id} placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.length > 0 ? (
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))
          ) : (
            <SelectLabel className="text-xs text-muted-foreground">
              No data.
            </SelectLabel>
          )}
        </SelectGroup>
      </SelectContent>
    </SelectUi>
  );
};

export { Select };
