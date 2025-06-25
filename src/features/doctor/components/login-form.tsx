"use client";

import { Form, FormItem } from "@/components/forms/form";
import { PasswordInput } from "@/components/input/password";
import { ErrorMessage } from "@/components/text/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@bprogress/next/app";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginDoctor } from "../actions/doctor";

export default function LoginForm() {
  const [data, action, isPending] = useActionState(loginDoctor, null);
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

      <Button disabled={isPending}>Login</Button>
    </Form>
  );
}
