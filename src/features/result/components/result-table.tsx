"use client";

import { PagePagination } from "@/components/pagination/pagination";
import { DataTable } from "@/components/table/data-table";
import { TableWrapper } from "@/components/table/table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Rank } from "@/types/rank";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";

export default function ResultTable({
  response,
}: {
  response: {
    data: Rank[];
    error: Error | null;
    count: number;
    page: number;
    size: number;
    questionCount: number;
  };
}) {
  const columns: ColumnDef<Rank>[] = [
    {
      accessorKey: "rank",
      size: 20,
      header: "Rank",
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative w-14 aspect-square rounded-md overflow-hidden">
          <Image
            src={`/api/image/${row.original?.image?.replace("/", "")}`}
            alt=""
            fill
            objectFit="cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "total_mark",
      header: "Total Mark",
      cell: ({ row }) => <p>{Number(row.original.total_mark)}</p>,
    },
    {
      accessorKey: "total_duration",
      header: "Total Duration (Sec)",
      cell: ({ row }) => <p>{formatDuration(row.original.total_duration)}</p>,
    },
  ];

  return (
    <>
      <TableWrapper>
        <DataTable data={response?.data ?? []} columns={columns} />
      </TableWrapper>

      <PagePagination count={response.count} limit={response.size} />
    </>
  );
}
