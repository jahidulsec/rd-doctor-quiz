"use server";
import { phoneRegex } from "@/lib/regex";
import { z } from "zod";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { createSession } from "@/lib/session";

const addSchema = z.object({
  full_name: z.string().min(2, { message: "At least 2 characters" }),
  password: z.string().min(6, { message: "At least 6 characters" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),

  mio_id: z.string().optional(),
});

const loginSchema = z.object({
  password: z.string().min(6, { message: "At least 6 characters" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),
});

export const addDoctor = async (prevState: unknown, formData: FormData) => {
  const modifiedFormData = Object.fromEntries(formData.entries());

  // Create a cleaned version
  const cleanedFormData = new FormData();

  for (const key in modifiedFormData) {
    if (
      modifiedFormData[key] !== null &&
      modifiedFormData[key] !== undefined &&
      modifiedFormData[key] !== "null" &&
      modifiedFormData[key] !== "" &&
      modifiedFormData[key] !== "undefined"
    ) {
      cleanedFormData.append(key, modifiedFormData[key]);
    }
  }

  try {
    const result = addSchema.safeParse(
      Object.fromEntries(cleanedFormData.entries())
    );

    if (result.success === false) {
      return {
        error: result.error.formErrors.fieldErrors,
        success: null,
        toast: null,
        values: modifiedFormData,
      };
    }

    const data = result.data;

    // check doctor
    const doctor = await db.doctor.findUnique({
      where: {
        mobile: data.mobile,
      },
    });

    if (doctor) {
      throw { message: "Doctor with this mobile already exists" };
    }

    const user = await db.doctor.create({
      data: {
        ...data,
      },
    });

    // create session
    await createSession({
      full_name: user.full_name,
      role: "doctor",
      id: user.mobile,
    });

    return {
      error: null,
      success: "Account is successfully created",
      toast: null,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return {
          error: null,
          success: null,
          toast: `${error?.meta?.constraint} does not exists`,
          values: modifiedFormData,
        };
      }
    }

    return {
      error: null,
      success: null,
      toast: (error as any).message,
      values: modifiedFormData,
    };
  }
};

export const loginDoctor = async (prevState: unknown, formData: FormData) => {
  const modifiedFormData = Object.fromEntries(formData.entries());

  try {
    const result = loginSchema.safeParse(modifiedFormData);

    if (result.success === false) {
      return {
        error: result.error.formErrors.fieldErrors,
        success: null,
        toast: null,
        values: modifiedFormData,
      };
    }

    const data = result.data;

    // check doctor
    const doctor = await db.doctor.findUnique({
      where: {
        mobile: data.mobile,
      },
    });

    if (!doctor) {
      throw { message: "Doctor does not exists" };
    }

    if (doctor.password !== data.password) {
      throw { message: "Incorrect Password" };
    }

    // create session
    await createSession({
      full_name: doctor.full_name,
      role: "doctor",
      id: doctor.mobile,
    });

    return {
      error: null,
      success: "Account is logged in successfully",
      toast: null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: null,
      success: null,
      toast: (error as any).message,
      values: modifiedFormData,
    };
  }
};
