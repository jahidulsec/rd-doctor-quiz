"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { range } from "@/lib/utils";

function PagePagination({ limit, count }: { limit: number; count: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const noOfPages = Math.ceil(count / limit);
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageStart = currentPage <= 4 ? 2 : currentPage - 2;
  const pageStop =
    currentPage >= noOfPages - 2 ? noOfPages - 1 : currentPage + 2;

  return (
    <Pagination>
      <PaginationContent className="flex justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              let value = Number(searchParams.get("page")) || 1;
              if (value > 1) {
                value -= 1;
                params.set("page", value.toString());
                params.toString();
                router.push(pathname + "?" + params.toString());
              }
            }}
          />
        </PaginationItem>

        <div className="hidden sm:flex gap-1">
          <PaginationItem>
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => {
                params.set("page", "1");
                params.toString();
                router.push(pathname + "?" + params.toString());
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {currentPage > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {range(pageStart, pageStop).map((item) => (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={Number(searchParams.get("page") || 1) === item}
                onClick={() => {
                  const value = item;
                  params.set("page", value.toString());
                  params.toString();
                  router.push(pathname + "?" + params.toString());
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < noOfPages - 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {noOfPages > 1 && (
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === noOfPages}
                onClick={() => {
                  params.set("page", noOfPages.toString());
                  params.toString();
                  router.push(pathname + "?" + params.toString());
                }}
              >
                {noOfPages}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              let value = Number(searchParams.get("page")) || 1;
              if (value < noOfPages) {
                value += 1;
                params.set("page", value.toString());
                params.toString();
                router.push(pathname + "?" + params.toString());
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PagePagination };
