"use client";

import { PagePagination } from "@/components/pagination/pagination";
import { DataTable } from "@/components/table/data-table";
import { TableWrapper } from "@/components/table/table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Prisma } from "@prisma/client";

export default function ResultTable({
  response,
}: {
  response: {
    data: Prisma.doctorGetPayload<{
      include: {
        doctor_submit: {
          include: {
            question: true;
          };
        };
      };
    }>[];
    error: string | null;
    count: number;
    page: number;
    size: number;
    questionCount: number;
  };
}) {
  const columns: ColumnDef<
    Prisma.doctorGetPayload<{
      include: {
        doctor_submit: {
          include: {
            question: true;
          };
        };
      };
    }>
  >[] = [
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
      header: "Mark",
      cell: ({ row }) => {
        const value = row.original;
        let total = 0;

        if (value.doctor_submit.length > 0) {
          for (let i = 0; i < value.doctor_submit.length; i++) {
            if (
              value.doctor_submit[i].answer ===
              value.doctor_submit[i].question.answer
            ) {
              total += 1;
            }
          }
        }

        return (
          <div className="">
            {total} / {response.questionCount}
          </div>
        );
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
