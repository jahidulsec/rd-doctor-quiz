"use server";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";
import { SearchParams } from "@/types/search-params";
import db from "../../../../db/db";

export const getQuestions = async (searchParams: SearchParams) => {
  const { page, size, search } = await searchParams;
  const validatedSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
  const validatedPage = page ? Number(page) : DEFAULT_PAGE;

  try {
    const [data, count] = await Promise.all([
      db.question.findMany({
        where: {
          ...(search && {
            title: {
              contains: search as string,
            },
          }),
        },
        take: validatedSize,
        skip: (validatedPage - 1) * validatedSize,
      }),
      db.question.count({
        where: {
          ...(search && {
            title: {
              contains: search as string,
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
