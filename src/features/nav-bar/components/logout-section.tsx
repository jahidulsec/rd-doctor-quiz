"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/features/doctor/actions/doctor";
import { useRouter } from "@bprogress/next";
import { LogOut } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function LogoutSection() {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className="bg-accent hover:bg-accent/40"
      onClick={async () => {
        const res = await logout();
        if (res.data) {
          toast.success(res.data);
          router.replace("/login");
        } else if (res.error) {
          toast.error(res.error);
        }
      }}
    >
      <LogOut className="text-secondary-foreground" />
      Logout
    </Button>
  );
}
