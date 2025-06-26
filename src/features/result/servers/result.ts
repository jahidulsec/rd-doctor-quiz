"use server";

import { SearchParams } from "@/types/search-params";
import db from "../../../../db/db";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";

export const getResults = async (searchParams: SearchParams) => {
  const { page, size, search } = await searchParams;
  const validatedSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
  const validatedPage = page ? Number(page) : DEFAULT_PAGE;

  try {
    const [data, count, questionCount] = await Promise.all([
      db.doctor.findMany({
        where: {
          ...(search && {
            OR: [
              {
                full_name: {
                    contains: search as string,
                }
              },
              {
                mobile: {
                    contains: search as string,
                }
              },
            ],
          }),
        },
        include: {
          doctor_submit: {
            include: {
              question: true,
            },
          },
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
                }
              },
              {
                mobile: {
                    contains: search as string,
                }
              },
            ],
          }),
        },
      }),
      db.question.count({}),
    ]);

    return {
      data: data,
      error: null,
      count: count,
      page: validatedPage,
      size: validatedSize,
      questionCount: questionCount,
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      error: (error as any).message,
      count: 0,
      page: validatedPage,
      size: validatedSize,
      questionCount: 0,
    };
  }
};
