"use client";

import { Button } from "@/components/ui/button";
import { ChartNoAxesColumnDecreasing, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const data = [
  {
    id: 1,
    name: "home",
    url: "/",
    icon: Home,
  },
  {
    id: 2,
    name: "leaderboard",
    url: "/leaderboard",
    icon: ChartNoAxesColumnDecreasing,
  },
];

export default function NavFooter() {
  return (
    <footer className="max-w-[20rem] mx-auto sticky bottom-5 w-full flex items-center justify-center gap-3 p-2 rounded-2xl border border-primary/50 bg-background">
      {data.map((item) => (
        <CustomButton props={item} key={item.id} />
      ))}
    </footer>
  );
}

const CustomButton = ({ props }: { props: (typeof data)[0] }) => {
  const pathname = usePathname();

  return (
    <Button
      variant={"ghost"}
      asChild
      className={`${pathname === props.url ? "bg-muted" : ""}`}
    >
      <Link href={props.url}>
        <props.icon
          className={`${
            pathname === props.url
              ? "fill-primary/25 text-primary"
              : "text-accent-foreground/50"
          }`}
        />
      </Link>
    </Button>
  );
};
