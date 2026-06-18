import { phoneRegex } from "@/lib/regex";
import { z } from "zod";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

export const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.size > 0, "Required")
  .refine((file) => file.type.startsWith("image/"), "File must be an image")
  .refine(
    (file) => file.size <= MAX_IMAGE_SIZE,
    "Image size must be 1MB or less",
  );

export const addDoctorSchema = z.object({
  full_name: z.string().min(2, { message: "At least 2 characters" }),
  password: z.string().min(6, { message: "At least 6 characters" }),
  mobile: z.string().regex(phoneRegex, { message: "Invalid" }),
  image: imageSchema,
  mio_id: z.string().min(4, { message: "Enter valid territory code" }),
});

export const updateDoctorSchema = addDoctorSchema.partial();

export type AddDoctorSchemaType = z.infer<typeof addDoctorSchema>;
export type UpdateDoctorSchemaType = z.infer<typeof updateDoctorSchema>;
