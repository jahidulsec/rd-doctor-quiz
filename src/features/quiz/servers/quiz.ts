"use server";

import db from "../../../../db/db";
import { format } from "date-fns";

export const getQuizzes = async () => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [data, count] = await Promise.all([
      db.question.findMany({
        where: {
          question_group: {
            quiz_date: {
              gte: new Date(format(currentDate, "yyyy-MM-dd")),
              lt: new Date(format(newDate, "yyyy-MM-dd")),
            },
          },
        },
      }),
      db.question.count({
        where: {
          question_group: {
            quiz_date: {
              gte: new Date(format(currentDate, "yyyy-MM-dd")),
              lt: new Date(format(newDate, "yyyy-MM-dd")),
            },
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

export const getQuizzesCount = async () => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [count] = await Promise.all([
      db.question.count({
        where: {
          question_group: {
            quiz_date: {
              gte: new Date(format(currentDate, "yyyy-MM-dd")),
              lt: new Date(format(newDate, "yyyy-MM-dd")),
            },
          },
        },
      }),
    ]);

    return count;
  } catch (error) {
    console.error(error);
    return 0;
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

  console.log(currentDate);
  console.log(newDate);
  try {
    const [data, count] = await Promise.all([
      db.doctor_submit.findMany({
        where: {
          question: {
            question_group: {
              quiz_date: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
            },
          },
          doctor_id: userId,
        },
      }),
      db.doctor_submit.count({
        where: {
          question: {
            question_group: {
              quiz_date: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
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

export const getQuizSubmitWithQuestion = async (userId: string) => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setDate(currentDate.getDate() + 1);

  try {
    const [data, count] = await Promise.all([
      db.doctor_submit.findMany({
        where: {
          question: {
            question_group: {
              quiz_date: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
            },
          },
          doctor_id: userId,
        },
        include: { question: true },
      }),
      db.doctor_submit.count({
        where: {
          question: {
            question_group: {
              quiz_date: {
                gte: new Date(format(currentDate, "yyyy-MM-dd")),
                lt: new Date(format(newDate, "yyyy-MM-dd")),
              },
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
