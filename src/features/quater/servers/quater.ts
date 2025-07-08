"use server";

import db from "../../../../db/db";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";

export const getQuaters = async (searchParams: any) => {
  const { page, size, date } = searchParams;
  const validatedSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
  const validatedPage = page ? Number(page) : DEFAULT_PAGE;

  try {
    const [data, count] = await Promise.all([
      db.quater.findMany({
        where: {
          ...(date && {
            start_date: {
              lte: new Date(date),
            },
            end_date: {
              gte: new Date(date),
            },
          }),
        },
        take: validatedSize,
        skip: (validatedPage - 1) * validatedSize,
      }),
      db.quater.count({
        where: {
          ...(date && {
            start_date: {
              lte: new Date(date),
            },
            end_date: {
              gte: new Date(date),
            },
          }),
        },
      }),
    ]);

    return {
      data: data,
      error: null,
      count: count,
      page: validatedPage,
      size: validatedSize,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      error: (error as any).message,
      count: 0,
      page: validatedPage,
      size: validatedSize,
    };
  }
};

export const getQuater = async (id: string) => {
  try {
    const [data] = await Promise.all([
      db.quater.findUnique({
        where: {
          id: id,
        },
      }),
    ]);

    return {
      data: data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: (error as any).message,
    };
  }
};
