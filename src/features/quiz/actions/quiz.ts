"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const quizSubmitSchema = z.object({
  question_id: z.string(),
  doctor_id: z.string(),
  group_id: z.string(),
  answer: z.coerce.number({ message: "Select a option" }),
  correct_answer: z.coerce.number(),
});

const quizzesSubmitSchema = z.object({
  data: z.array(quizSubmitSchema),
});

export const submitQuizzes = async (response: any[]) => {
  const res = response;
  console.log(res);
  try {
    const result = quizzesSubmitSchema.safeParse({ data: res });

    if (result.success === false) {
      return {
        error: result.error.formErrors.fieldErrors,
        success: null,
        toast: null,
      };
    }

    const data = result.data.data;

    const response = await db.doctor_submit.createMany({
      data: data.map((item) => {
        const { group_id, correct_answer, ...rest } = item;
        console.log(group_id);
        return {
          ...rest,
          mark: rest.answer === Number(correct_answer) ? 1 : 0,
        };
      }),
    });

    // get paritcipation data
    const participatedData = await db.group_doctor.findFirst({
      where: {
        doctor_id: result.data.data[0].doctor_id,
        group_id: result.data.data[0].group_id,
      },
    });

    const currentTime = new Date();
    const duration =
      currentTime.getTime() - Number(participatedData?.start_date.getTime());

    // submit end date in participation
    await db.group_doctor.update({
      where: {
        id: participatedData?.id,
      },
      data: {
        duration_s: duration / 1000,
        end_date: currentTime,
      },
    });

    revalidatePath("/preview");
    revalidatePath("/");
    revalidatePath("/quiz");

    return {
      error: null,
      success: "Quiz is successfully submitted",
      toast: null,
      response: response,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: null,
          success: null,
          toast: `You already participated`,
        };
      }
    }
    return {
      error: null,
      success: null,
      toast: (error as any).message,
    };
  }
};
