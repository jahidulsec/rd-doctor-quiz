"use server";

import { NextRequest } from "next/server";
import db from "../../../../db/db";
import { Rank } from "@/types/rank";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const quiz_date = searchParams.get("quiz_date") ?? undefined;

    const baseQuery = `
      WITH ranked_doctors AS (
        SELECT
          d.full_name,
          d.mobile,
          d.image,
          IFNULL((
            SELECT SUM(r.mark)
            FROM doctor_submit r
            LEFT JOIN question q ON q.id = r.question_id
            LEFT JOIN question_group g ON g.id = q.group_id
            WHERE r.doctor_id = d.mobile
            ${quiz_date ? "AND g.quiz_date = ?" : ""}
          ), 0) AS total_mark,
          IFNULL((
            SELECT SUM(t.duration_s)
            FROM group_doctor t
            LEFT JOIN question_group g ON g.id = t.group_id
            WHERE t.doctor_id = d.mobile
            ${quiz_date ? "AND g.quiz_date = ?" : ""}
          ), 0) AS total_duration,
          IF((
            IFNULL((
              SELECT SUM(t.duration_s)
              FROM group_doctor t
              LEFT JOIN question_group g ON g.id = t.group_id
              WHERE t.doctor_id = d.mobile
              ${quiz_date ? "AND g.quiz_date = ?" : ""}
            ), 0)
          ) > 0, 1, 0) AS is_participated,
          RANK() OVER (
            ORDER BY total_mark DESC, is_participated DESC, total_duration ASC
          ) AS rank
        FROM doctor d
      )
      SELECT *
      FROM ranked_doctors
    `;

    const params: any[] = [];

    // Push quiz_date if it exists (3 times for each subquery)
    if (quiz_date) {
      params.push(quiz_date, quiz_date, quiz_date);
    }

    const data = await db.$queryRawUnsafe(baseQuery, ...params);
    return Response.json({
      data: (data as Rank[]).map((item) => {
        return {
          rank: Number(item.rank),
          full_name: item.full_name,
          mobile: item.mobile,
          total_mark: Number(item.total_mark),
          total_duration: item.total_duration,
        };
      }),
      error: null,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      data: [],
      error: (error as any).message,
    });
  }
}
