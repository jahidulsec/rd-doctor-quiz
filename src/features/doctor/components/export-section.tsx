"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Download } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

function ExportSection() {
  const [isPending, startTransition] = useTransition();

  // export csv
  const convertToCSV = (objArray: object[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = ``;
    str += `\r\n`;
    str += "Full name, mobile, mio_id, created_date \r\n";

    for (let i = 0; i < array.length; i++) {
      let line = ``;
      for (const index in array[i]) {
        if (line !== "") line += ",";
        if (index === "created_at") {
          line += format(new Date(array[i][index]), "yyyy-MM-dd");
        } else {
          line += array[i][index];
        }
      }
      str += line + "\r\n";
    }

    return str;
  };

  const downloadCSV = async () => {
    const res = await fetch(`/api/doctor`);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error);
      return;
    }
    const data = await res.json();
    const csvData = new Blob([convertToCSV(data.data)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
    });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `doctors.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await downloadCSV();
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

export default ExportSection;
