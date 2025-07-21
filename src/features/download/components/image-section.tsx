"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Download } from "lucide-react";
import Image from "next/image";
import React, { useTransition } from "react";

export default function ImageSection({
  src,
  name,
  mobile,
}: {
  src: string;
  name: string;
  mobile: string;
}) {
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    if (src) {
      downloadImage();
    }
  }, [src]);

  const downloadImage = async () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${name.replaceAll(".", "_").replaceAll(" ", "_")}-${mobile}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{mobile}</p>
        </div>
        <Button
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await downloadImage();
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
          <span>Download</span>
        </Button>
      </div>

      <div className="border p-4 bg-muted rounded-md">
        <Image
          src={src}
          alt="image"
          width={500}
          height={500}
          objectFit="cover"
        />
      </div>
    </div>
  );
}
