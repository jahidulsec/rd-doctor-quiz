"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Rank } from "@/types/rank";
import { Download } from "lucide-react";
import React, { useTransition } from "react";

export default function DownloadSection({ data }: { data: Rank[] }) {
  const [isPending, startTransition] = useTransition();

  const downloadImages = async () => {
    for (let i = 0; i < data.length; i++) {
      const link = document.createElement("a");
      link.href = `http://localhost:5007/api/image${data[i].image}`;
      link.download = `${data[i].rank}-${data[i].full_name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Button
        disabled={isPending}
        className="flex-1/2 sm:flex-none"
        onClick={() => {
          startTransition(async () => {
            await downloadImages();
          });
        }}
      >
        {isPending ? (
          <Spinner
            borderBottomColor="borber-b-background"
            className="mr-2 size-4"
          />
        ) : (
          <Download className="size-4 mr-2" />
        )}
        <span>Export</span>
      </Button>
    </>
  );
}
