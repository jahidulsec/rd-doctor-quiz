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

    const response = await db.doctor_submit.createMany({
      data: res.map((item: any) => {
        const { group_id, ...rest } = item;
        console.log(group_id);
        return {
          ...rest,
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

    // submit end date in participation
    await db.group_doctor.update({
      where: {
        id: participatedData?.id,
      },
      data: {
        end_date: new Date(),
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
