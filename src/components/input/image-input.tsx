"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageInput = ({
  className,
  imageClassName,
  onChange,
  defaultFile,
  id,
  ...props
}: React.ComponentProps<"input"> & {
  imageClassName?: string;
  defaultFile?: any;
}) => {
  const [upload, setUpload] = React.useState<File | undefined>(undefined);

  React.useEffect(() => {
    let objectUrl: string | null = null;

    if (upload) {
      objectUrl = URL.createObjectURL(upload);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [upload]);

  React.useEffect(() => {
    setUpload(undefined);
    console.log("heello");
  }, [defaultFile]);

  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className="text-sm text-muted-foreground cursor-pointer border p-2 w-fit"
      >
        Upload
      </Label>
      <Input
        id={id}
        type="file"
        accept="image/*"
        className={cn("hidden", className)}
        aria-label="Upload image"
        title="Upload image"
        onError={(e) => {
          console.error("Failed to load image preview", e);
        }}
        {...props}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            setUpload(file);
            if (onChange) {
              onChange(e);
            }
          }
        }}
      />

      {upload ? (
        <Image
          width={200}
          height={200}
          src={URL.createObjectURL(upload)}
          alt="upload"
          className={cn(
            "rounded-full w-20 h-20 object-contain mt-3",
            imageClassName
          )}
        />
      ) : typeof defaultFile === "string" ? (
        <Image
          width={200}
          height={200}
          src={defaultFile}
          alt="upload"
          className={cn(
            "rounded-full w-20 h-20 object-contain mt-3",
            imageClassName
          )}
        />
      ) : (
        <div
          className={cn("w-20 h-20 rounded-full bg-muted mt-3", imageClassName)}
        />
      )}
    </div>
  );
};

export { ImageInput };
