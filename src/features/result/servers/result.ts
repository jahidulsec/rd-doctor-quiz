"use server";

import db from "../../../../db/db";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";

export const getResults = async (searchParams: any) => {
  const { page, size, search } = await searchParams;
  const validatedSize = size ? Number(size) : DEFAULT_PAGE_SIZE;
  const validatedPage = page ? Number(page) : DEFAULT_PAGE;

  const offset = (validatedPage - 1) * validatedSize;

  let baseQuery = `
    WITH ranked_doctors AS (
      SELECT
        d.full_name, d.mobile, d.image,
        IFNULL((
          SELECT SUM(r.mark)
          FROM doctor_submit r
          WHERE r.doctor_id = d.mobile
        ), 0) AS total_mark,
        IFNULL((
          SELECT SUM(t.duration_s)
          FROM group_doctor t
          WHERE t.doctor_id = d.mobile
        ), 300000) AS total_duration,
        RANK() OVER (
          ORDER BY total_mark DESC, total_duration ASC
        ) AS rank
      FROM doctor d
    )
    SELECT *
    FROM ranked_doctors
  `;

  const params: any[] = [];

  // Add search condition if `search` is non-empty
  if (search && search.trim() !== "") {
    baseQuery += ` WHERE mobile LIKE ? OR full_name LIKE ?`;
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm);
  }

  // Add pagination
  baseQuery += ` LIMIT ?, ?`;
  params.push(offset, validatedSize);

  try {
    const [data, count, questionCount] = await Promise.all([
      db.$queryRawUnsafe(baseQuery, ...params),
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
