"use client";

import { PagePagination } from "@/components/pagination/pagination";
import { DataTable } from "@/components/table/data-table";
import { TableWrapper } from "@/components/table/table";
import { formatDate } from "@/lib/formatters";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { doctor } from "@prisma/client";

export default function DoctorTable({
  response,
}: {
  response: {
    data: doctor[];
    error: string | null;
    count: number;
    page: number;
    size: number;
  };
}) {
  const columns: ColumnDef<doctor>[] = [
    {
      header: "#",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        return (
          <span className="text-nowrap">
            {row.index + 1 + pageIndex * pageSize}
          </span>
        );
      },
      size: 20,
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
      accessorKey: "mio_id",
      header: "MIO",
    },

    {
      header: "Created At",
      cell: ({ row }) => {
        const data = row.original;

        return <span>{formatDate(new Date(data.created_at))}</span>;
      },
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
