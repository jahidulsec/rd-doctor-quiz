"use server";

import { getDateRange } from "@/lib/utils";
import db from "../../../../db/db";

export const getQuizzes = async () => {
  try {
    const data = await db.question.findFirst({
      where: {
        quiz_date: getDateRange(new Date()),
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQuiz = async (id: string) => {
  try {
    const data = await db.question.findUnique({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQuizSubmit = async (userId: string) => {
  try {
    const data = await db.doctor_submit.findFirst({
      where: {
        question: {
          quiz_date: getDateRange(new Date()),
        },
        doctor_id: userId,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
