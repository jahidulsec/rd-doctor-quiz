"use client";

import { PagePagination } from "@/components/pagination/pagination";
import { DataTable } from "@/components/table/data-table";
import { TableWrapper } from "@/components/table/table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Rank } from "@/types/rank";
import { formatDuration } from "@/lib/utils";

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
