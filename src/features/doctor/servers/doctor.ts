"use server";

import { SearchParams } from "@/types/search-params";
import db from "../../../../db/db";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";

export const getDoctors = async (searchParams: SearchParams) => {
  const { page, size, search } = await searchParams;
  const validatedSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
  const validatedPage = page ? Number(page) : DEFAULT_PAGE;

  try {
    const [data, count] = await Promise.all([
      db.doctor.findMany({
        where: {
          ...(search && {
            OR: [
              {
                full_name: {
                  contains: search as string,
                },
              },
              {
                mobile: {
                  contains: search as string,
                },
              },
            ],
          }),
        },
        take: validatedSize,
        skip: (validatedPage - 1) * validatedSize,
      }),
      db.doctor.count({
        where: {
          ...(search && {
            OR: [
              {
                full_name: {
                  contains: search as string,
                },
              },
              {
                mobile: {
                  contains: search as string,
                },
              },
            ],
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

export const getDoctor = async (id: string) => {
  try {
    const [data] = await Promise.all([
      db.doctor.findUnique({
        where: {
          mobile: id,
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
