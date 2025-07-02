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
        group_doctor: true;
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
        group_doctor: true;
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
      header: "Time",
      cell: ({ row }) => {
        const data = row.original;
        let totalTime = 0;

        if (data.group_doctor && data.group_doctor.length > 0) {
          totalTime = data.group_doctor.reduce(
            (acc, curr) => acc + (curr.duration_s || 0),
            0
          );
        }

        return <div className="">{totalTime > 0 ? totalTime : "-"}</div>;
      },
    },
    {
      header: "Mark",
      cell: ({ row }) => {
        const value = row.original;
        let total = 0;

        if (value.doctor_submit.length > 0) {
          for (let i = 0; i < value.doctor_submit.length; i++) {
            total += value.doctor_submit[i].mark;
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
