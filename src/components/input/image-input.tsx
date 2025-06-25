"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageInputProps = React.ComponentProps<"input"> & {
  defaultValue?: string; // default image URL
};

const ImageInput = ({ className, defaultValue, ...props }: ImageInputProps) => {
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e); // pass up
    }

    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const imageSrc = file
    ? URL.createObjectURL(file)
    : defaultValue
    ? defaultValue.toString()
    : null;

  useEffect(() => {
    if (defaultValue && defaultValue == "") {
      setFile(undefined);
    }
  }, []);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Input type="file" onChange={handleChange} accept="image/*" {...props} />

      {imageSrc && (
        <div className="bg-muted/50">
          <div className="relative w-full aspect-[16/4] min-h-[60px] max-h-[80px]">
            <Image fill objectFit="contain" alt="Preview" src={imageSrc} />
          </div>
        </div>
      )}
    </div>
  );
};

export { ImageInput };
