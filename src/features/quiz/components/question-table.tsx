"use client";

import { PagePagination } from "@/components/pagination/pagination";
import { DataTable } from "@/components/table/data-table";
import { TableWrapper } from "@/components/table/table";
import { formatDate } from "@/lib/formatters";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Prisma } from "@prisma/client";

export default function QuestionTable({
  response,
}: {
  response: {
    data: Prisma.questionGetPayload<{ include: { question_group: true } }>[];
    count: number;
    page: number;
    size: number;
  };
}) {
  const columns: ColumnDef<(typeof response.data)[0]>[] = [
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
      accessorKey: "title",
      header: "Question",
    },
    {
      accessorKey: "option_1",
      header: "Option 1",
    },
    {
      accessorKey: "option_2",
      header: "Option 2",
    },
    {
      accessorKey: "option_3",
      header: "Option 3",
    },
    {
      accessorKey: "option_4",
      header: "Option 4",
    },
    {
      accessorKey: "answer",
      header: "Answer",
    },
    {
      header: "Quiz Date",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <span>{formatDate(new Date(data.question_group.quiz_date))}</span>
        );
      },
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
