"use server";

import { z } from "zod";
import db from "../../../../db/db";
import { createSession, deleteSession } from "@/lib/session";

const loginSchema = z.object({
  password: z.string().min(6, { message: "At least 6 characters" }),
  username: z.string(),
});

export const loginAdmin = async (prevState: unknown, formData: FormData) => {
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

    // check admin
    const admin = await db.admin.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!admin) {
      throw { message: "Admin does not exists" };
    }

    if (admin.password !== data.password) {
      throw { message: "Incorrect Password" };
    }

    // create session
    await createSession({
      full_name: admin.full_name,
      role: "admin",
      id: admin.username,
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

export const logout = async () => {
  try {
    await deleteSession();

    return {
      success: "Your are successfully logged out",
      error: null,
    };
  } catch (error) {
    return {
      success: "Your are successfully logged out",
      error: (error as any).message,
    };
  }
};
