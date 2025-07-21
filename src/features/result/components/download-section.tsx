"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Rank } from "@/types/rank";
import { Download } from "lucide-react";
import React, { useTransition } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function DownloadSection({ data }: { data: Rank[] }) {
  const [isPending, startTransition] = useTransition();

  const downloadImages = async () => {
    const zip = new JSZip();
    const folder = zip.folder("top_150_doctors");

    for (let i = 0; i < data.length; i++) {
      const imagePath = `/api/image${data[i].image}`;
      const fileName = `${data[i].rank}-${data[i].full_name
        .replaceAll(".", "_")
        .replaceAll(" ", "_")}.jpg`; // Change extension as needed

      try {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        folder?.file(fileName, arrayBuffer);
      } catch (error) {
        console.error(`Failed to fetch image: ${fileName}`, error);
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
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
        <span>Images (150)</span>
      </Button>
    </>
  );
}
