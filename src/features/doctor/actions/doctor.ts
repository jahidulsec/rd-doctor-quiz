"use server";
import { phoneRegex } from "@/lib/regex";
import { z } from "zod";
import db from "../../../../db/db";
import { Prisma } from "@prisma/client";
import { createSession } from "@/lib/session";
import fs from "fs/promises";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

const addSchema = z.object({
  full_name: z.string().min(2, { message: "At least 2 characters" }),
  password: z.string().min(6, { message: "At least 6 characters" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),
  image: z
    .instanceof(File, { message: "Required" })
    .refine((file) => file.size > 0, "Required")
    .refine((file) => file.type.startsWith("image/"), "File must be an image")
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      "Image size must be 1MB or less"
    ),
  mio_id: z.string(),
});

const loginSchema = z.object({
  password: z.string().min(6, { message: "At least 6 characters" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),
});

export const addDoctor = async (prevState: unknown, formData: FormData) => {
  const modifiedFormData = Object.fromEntries(formData.entries());
  let uploadedImage = "";

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

    if (data.image) {
      await fs.mkdir("public/doctors", { recursive: true });

      uploadedImage = `/doctors/${crypto.randomUUID()}-${data.image.name}`;
      const imageFile = new Uint8Array(await data.image.arrayBuffer());

      await fs.writeFile(`public${uploadedImage}`, Buffer.from(imageFile));
    }

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
        image: uploadedImage,
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

    // delete image
    fs.unlink(`public${uploadedImage}`).catch((err) => console.error(err));

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
