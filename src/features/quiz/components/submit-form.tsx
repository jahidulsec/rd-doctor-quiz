"use client";

import { Button } from "@/components/ui/button";
import { doctor_submit, question } from "@prisma/client";
import { Check, X } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { submitQuiz } from "../actions/quiz";
import { ErrorMessage } from "@/components/text/error-message";
import { toast } from "sonner";
import Link from "next/link";

export default function SubmitForm({
  response,
  userId,
  id,
  quizSubmitResponse,
}: {
  response: question;
  userId?: string;
  id: string;
  quizSubmitResponse?: doctor_submit;
}) {
  const [checkedValue, setCheckedValue] = React.useState<number | undefined>(
    quizSubmitResponse?.answer ?? undefined
  );
  const [data, action, isPending] = useActionState(submitQuiz, null);

  useEffect(() => {
    if (data?.toast) {
      toast.error(data.toast);
    } else if (data?.success) {
      toast.success(data.success);
    }
  }, [data]);

  const res = data?.response ?? quizSubmitResponse;

  return (
    <form action={action} className="my-6 flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-5">
        <Button
          type="button"
          variant={checkedValue === 1 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(1)}
        >
          {response.option_1}
        </Button>
        <Button
          type="button"
          variant={checkedValue === 2 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(2)}
        >
          {response.option_2}
        </Button>
        <Button
          type="button"
          variant={checkedValue === 3 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(3)}
        >
          {response.option_3}
        </Button>
        <Button
          type="button"
          variant={checkedValue === 4 ? "secondary" : "outline"}
          className="border-primary/15"
          onClick={() => setCheckedValue(4)}
        >
          {response.option_4}
        </Button>
      </div>

      {data?.error && (
        <ErrorMessage message={data.error.answer?.toString() ?? ""} />
      )}

      {/* hidden inputs */}
      <input
        className="hidden"
        name="answer"
        type="number"
        value={checkedValue}
      />
      <input type="hidden" name="
      " value={userId} />
      <input type="hidden" name="question_id" value={id} />

      {/* answer section */}
      {res ? (
        <div className="">
          <div
            className={`flex items-center gap-3  p-4 rounded-md ${
              res?.answer === response.answer
                ? "bg-emerald-100/50"
                : "bg-secondary/15"
            }`}
          >
            {res?.answer === response.answer ? (
              <Check className={`text-emerald-600 size-4`} />
            ) : (
              <X className={`text-secondary size-4`} />
            )}

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
          <Button asChild className="mt-6">
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
