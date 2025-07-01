"use client";

import { Form, FormItem } from "@/components/forms/form";
import { PasswordInput } from "@/components/input/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { addDoctor } from "../actions/doctor";
import { ErrorMessage } from "@/components/text/error-message";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next/app";
import { ImageInput } from "@/components/input/image-input";

export default function RegisterForm() {
  const [data, action, isPending] = useActionState(addDoctor, null);
  const router = useRouter();

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
      router.push("/");
    }
  }, [data]);

  return (
    <Form action={action}>
      <FormItem>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          name="full_name"
          id="full_name"
          placeholder="eg. Dr. John Doe"
          defaultValue={data?.values?.full_name.toString()}
        />
        {data?.error && (
          <ErrorMessage message={data.error.full_name?.[0] ?? ""} />
        )}
      </FormItem>
      <FormItem>
        <Label htmlFor="mobile">Mobile</Label>
        <Input
          name="mobile"
          id="mobile"
          placeholder="eg. 01777888555"
          defaultValue={data?.values?.mobile.toString() ?? undefined}
        />
        {data?.error && <ErrorMessage message={data.error.mobile?.[0] ?? ""} />}
      </FormItem>
      <FormItem>
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          name="password"
          id="password"
          placeholder="Enter at least 6 characters"
          defaultValue={data?.values?.password.toString() ?? undefined}
        />
        {data?.error && (
          <ErrorMessage message={data.error.password?.[0] ?? ""} />
        )}
      </FormItem>

      <FormItem className="col-span-1 md:col-span-3">
        <Label>Image</Label>
        <ImageInput
          id="1"
          imageClassName="w-30 h-30 rounded-md"
          width={100}
          height={100}
          type="file"
          name="image"
          className="rounded-md"
          defaultFile={data?.values?.image ?? undefined}
        />
        {data?.error?.image && <ErrorMessage message={data.error.image[0]} />}
      </FormItem>

      <FormItem>
        <Label htmlFor="mio_id">MIO ID </Label>
        <Input
          name="mio_id"
          id="mio_id"
          placeholder="MIO SAP territory code"
          defaultValue={data?.values?.mio_id.toString() ?? undefined}
        />
      </FormItem>

      <Button disabled={isPending}>Register</Button>
    </Form>
  );
}
