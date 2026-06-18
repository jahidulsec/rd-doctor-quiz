"use client";

import { Form } from "@/components/forms/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { addDoctor, updateDoctor } from "../actions/doctor";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { ImageInput } from "@/components/input/image-input";
import { doctor } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { addDoctorSchema, updateDoctorSchema } from "@/schema/doctor";
import { FormButton } from "@/components/button/button";

export default function RegisterForm({
  doctor,
  onClose,
}: {
  doctor?: doctor;
  onClose?: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(
      doctor?.mobile ? updateDoctorSchema : addDoctorSchema,
    ),
    defaultValues: {
      password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD,
      mobile: doctor?.mobile,
      full_name: doctor?.full_name,
      mio_id: doctor?.mio_id ?? "",
    },
  });

  const router = useRouter();

  const image = form.watch("image");

  const onSubmit = async (data: any) => {
    const res = doctor?.mobile
      ? await updateDoctor(doctor.mobile, data)
      : await addDoctor(data);

    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      if (!doctor?.mobile) {
        router.replace("/register/success");
      }
      onClose?.();
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="full_name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="eg. Dr. John Doe"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="mobile"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Mobile No.</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="eg. 01777888555"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="image"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Image</FieldLabel>
              <Input
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files[0]);
                  }
                }}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {image && (
          <ImageInput
            id="1"
            imageClassName="w-30 h-30 rounded-md border"
            width={100}
            height={100}
            type="file"
            name="image"
            className="rounded-md"
            defaultFile={URL.createObjectURL(image)}
          />
        )}

        <Controller
          control={form.control}
          name="mio_id"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>SAP Territory Code</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Territory code"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FormButton disabled={form.formState.isSubmitting}>Register</FormButton>
    </Form>
  );
}
