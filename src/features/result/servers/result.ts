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
      db.$queryRaw`
        with
          ranked_doctors as (
              select
                  d.*,
                  IFNULL(
                      (
                          select sum(r.mark)
                          from doctor_submit r
                          WHERE
                              r.doctor_id = d.mobile
                      ),
                      0
                  ) total_mark,
                  IFNULL(
                      (
                          select sum(t.duration_s)
                          from group_doctor t
                          WHERE
                              t.doctor_id = d.mobile
                      ),
                      300000
                  ) total_duration,
                  RANK() OVER (
                      ORDER BY total_mark DESC, total_duration ASC
                  ) rank
              from doctor d
          )
      SELECT *
      FROM ranked_doctors
      where mobile LIKE "%01672322632%" OR full_name LIKE "%%r. John%"
      limit ${(validatedPage - 1) * validatedSize}, ${validatedSize};
      `,
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
      db.question.count({}),
    ]);

    return {
      data: data as any,
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
      error: error as Error,
      count: 0,
      page: validatedPage,
      size: validatedSize,
      questionCount: 0,
    };
  }
};
