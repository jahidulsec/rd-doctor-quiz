"use client";

import { Button } from "@/components/ui/button";
import { question } from "@prisma/client";
import { Check } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { submitQuiz } from "../actions/quiz";
import { ErrorMessage } from "@/components/text/error-message";
import { toast } from "sonner";
import Link from "next/link";

export default function SubmitForm({
  response,
  userId,
  id,
}: {
  response: question;
  userId?: string;
  id: string;
}) {
  const [checkedValue, setCheckedValue] = React.useState<number | undefined>(
    undefined
  );
  const [data, action, isPending] = useActionState(submitQuiz, null);

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
    }
  }, [data]);

  return (
    <form action={action} className="my-6 flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-5">
        <Button
          type="button"
          variant={checkedValue === 1 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(1)}
        >
          {checkedValue === 1 && <Check />}
          {response.option_1}
        </Button>
        <Button
          type="button"
          variant={checkedValue === 2 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(2)}
        >
          {checkedValue === 2 && <Check />}
          {response.option_2}
        </Button>
        <Button
          type="button"
          variant={checkedValue === 3 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(3)}
        >
          {checkedValue === 3 && <Check />}
          {response.option_3}
        </Button>
        <Button
          type="button"
          variant={checkedValue === 4 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(4)}
        >
          {checkedValue === 4 && <Check />}
          {response.option_4}
        </Button>
      </div>

      {data?.error && (
        <ErrorMessage message={data.error.answer?.toString() ?? ""} />
      )}

      <input
        className="hidden"
        name="answer"
        type="number"
        value={checkedValue}
      />
      <input type="hidden" name="doctor_id" value={userId} />
      <input type="hidden" name="question_id" value={id} />

      {data?.response ? (
        <div className="">
          <div
            className={`flex items-center gap-3  p-4 rounded-md ${
              data.response.answer === response.answer
                ? "bg-emerald-100/50"
                : "bg-secondary/15"
            }`}
          >
            <Check
              className={`${
                data.response.answer === response.answer
                  ? "text-emerald-600"
                  : "text-secondary"
              }  size-4`}
            />
            <p className="font-semibold">
              {response.answer === 1
                ? response.option_1
                : response.answer === 2
                ? response.option_2
                : response.answer === 3
                ? response.option_3
                : response.answer === 4
                ? response.option_4
                : null}
            </p>
          </div>
          <Button asChild>
            <Link href={`/quiz`}>Go Back</Link>
          </Button>
        </div>
      ) : (
        <Button
          disabled={isPending}
          className="w-fit self-center mt-10 min-w-[10rem]"
        >
          Submit
        </Button>
      )}
    </form>
  );
}
