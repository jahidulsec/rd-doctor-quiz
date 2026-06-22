"use server";
import { phoneRegex } from "@/lib/regex";
import { z } from "zod";
import db from "../../../../db/db";
import { createSession, deleteSession } from "@/lib/session";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import {
  addDoctorSchema,
  AddDoctorSchemaType,
  updateDoctorSchema,
  UpdateDoctorSchemaType,
} from "@/schema/doctor";
import { apiResponse } from "@/lib/response";

const loginSchema = z.object({
  password: z.string().min(6, { message: "At least 6 characters" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),
});

export const addDoctor = async (data: AddDoctorSchemaType) => {
  let uploadedImage = "";

  try {
    const formData = addDoctorSchema.parse(data);

    // check territory
    const territory = await db.mio.findUnique({
      where: { sap_territory_code: formData.mio_id },
    });

    if (!territory) {
      throw new Error(`Territory does not exists. Please contact our MIO`);
    }

    if (formData.image) {
      await fs.mkdir("public/doctors", { recursive: true });

      uploadedImage = `/doctors/${crypto.randomUUID()}-${formData.image.name}`;
      const imageFile = new Uint8Array(await formData.image.arrayBuffer());

      await fs.writeFile(`public${uploadedImage}`, Buffer.from(imageFile));
    }

    // check doctor
    const doctor = await db.doctor.findUnique({
      where: {
        mobile: formData.mobile,
      },
    });

    if (doctor) {
      throw new Error("Doctor with this mobile already exists");
    }

    const user = await db.doctor.create({
      data: {
        ...formData,
        image: uploadedImage,
      },
    });

    // create session
    await createSession({
      full_name: user.full_name,
      role: "doctor",
      id: user.mobile,
      mio_id: user.mio_id ?? '',
      region_code: territory.region_code ?? ''
    });

    return apiResponse.single({
      data: user,
      message: "Account is successfully created",
    });
  } catch (error) {
    return apiResponse.error({ error });
  }
};

export const updateDoctor = async (
  id: string,
  data: UpdateDoctorSchemaType,
) => {
  let uploadedImage = "";

  try {
    const { image, ...formData } = updateDoctorSchema.parse(data);

    // check doctor
    const doctor = await db.doctor.findUnique({
      where: {
        mobile: id,
      },
    });

    if (image) {
      await fs.mkdir("public/doctors", { recursive: true });

      uploadedImage = `/doctors/${crypto.randomUUID()}-${image.name}`;
      const imageFile = new Uint8Array(await image.arrayBuffer());

      await fs.writeFile(`public${uploadedImage}`, Buffer.from(imageFile));

      // delete previous one
      fs.unlink(`public${doctor?.image}`).catch((err) => console.error(err));
    }

    await db.doctor.update({
      where: { mobile: id },
      data: {
        ...formData,
        ...(uploadedImage && {
          image: uploadedImage,
        }),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/question");
    revalidatePath("/dashboard/result");

    return apiResponse.single({
      data: doctor,
      message: "Doctor is successfully updated",
    });
  } catch (error) {
    return apiResponse.error({ error });
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

    // get territory details
    const territory = await db.mio.findUnique({
      where: {
        sap_territory_code: doctor.mio_id ?? "",
      },
    });

    // create session
    await createSession({
      full_name: doctor.full_name,
      role: "doctor",
      id: doctor.mobile,
      mio_id: doctor.mio_id ?? "",
      region_code: territory?.region_code ?? "",
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
    return { data: "You are logged out" };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
