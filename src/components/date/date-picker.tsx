"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "@bprogress/next";
import { usePathname, useSearchParams } from "next/navigation";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParmas = useSearchParams();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal flex-1/2 sm:flex-none"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            if (date) {
              const params = new URLSearchParams(searchParmas);
              params.set("quiz_date", format(date, "yyyy-MM-dd"));
              router.push(`${pathname}?${params.toString()}`);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
