"use server";

import db from "../../../../db/db";

export const getQuizzes = async () => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [data, count] = await Promise.all([
      db.question.findMany({
        where: {
          quiz_date: {
            gte: currentDate,
            lt: newDate,
          },
        },
      }),
      db.question.count({
        where: {
          quiz_date: {
            gte: currentDate,
            lt: newDate,
          },
        },
      }),
    ]);

    return { data, count };
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
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [data, count] = await Promise.all([
      db.doctor_submit.findMany({
        where: {
          question: {
            quiz_date: {
              gte: currentDate,
              lt: newDate,
            },
          },
          doctor_id: userId,
        },
      }),
      db.doctor_submit.count({
        where: {
          question: {
            quiz_date: {
              gte: currentDate,
              lt: newDate,
            },
          },
          doctor_id: userId,
        },
      }),
    ]);

    return { data, count };
  } catch (error) {
    console.error(error);
    return null;
  }
};
