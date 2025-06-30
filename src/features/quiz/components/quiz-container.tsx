"use client";

import { Form } from "@/components/forms/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { doctor_submit, question } from "@prisma/client";
import React, { useTransition } from "react";
import { submitQuizzes } from "../actions/quiz";
import { toast } from "sonner";
import { useRouter } from "@bprogress/next";

export default function QuizContainer({
  question,
  submissions,
  doctor_id,
}: {
  question: { data: question[]; count: number } | null;
  submissions: { data: doctor_submit[]; count: number } | null;
  doctor_id?: string;
}) {
  const [submitCount, setSubmitCount] = React.useState(submissions?.count ?? 0);
  const [checkedValue, setCheckedValue] = React.useState<number | undefined>(
    submissions?.data?.[0]?.answer ?? undefined
  );
  const [submitResponse, setSubmitResponse] = React.useState<
    Partial<doctor_submit>[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const currentQuestion = question?.data?.[submitCount];

  const handleNext = () => {
    if (!currentQuestion || checkedValue === undefined) return;

    setSubmitResponse((prev) => [
      ...prev,
      {
        doctor_id,
        question_id: currentQuestion.id,
        answer: checkedValue,
      },
    ]);

    setSubmitCount((prev) => prev + 1);
    setCheckedValue(undefined);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const response = await submitQuizzes(submitResponse);
      if (response.success) {
        toast.success(response.success);
        router.push('/success')
      } else if (response.toast) {
        toast.error(response.toast);
      } 
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div>
        <h3 className="text-xs font-medium">Questions</h3>
        <p className="text-2xl font-semibold text-primary">
          <span className="text-secondary">{submitCount}</span>/
          {question?.count}
        </p>
        <Progress
          className="mt-6"
          value={(submitCount * 100) / (question?.count ?? 1)}
        />
      </div>

      {/* Question Form */}
      <Form className="mt-6">
        {currentQuestion ? (
          <>
            <p className="text-xl font-semibold rounded-md bg-secondary min-h-20 p-4 text-secondary-foreground">
              {currentQuestion?.title}
            </p>

            <div className="grid grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((val) => (
                <CustomButton
                  key={val}
                  type="button"
                  data-selected={checkedValue === val}
                  onClick={() => setCheckedValue(val)}
                >
                  {String(
                    currentQuestion?.[`option_${val}` as keyof question]
                  ) || ""}
                </CustomButton>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">Submit your response.</p>
        )}

        {(question?.count ?? 0) > submitCount ? (
          <Button
            type="button"
            className="mt-14"
            onClick={handleNext}
            disabled={checkedValue === undefined}
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            className="mt-14"
            onClick={handleSubmit}
            disabled={isPending || question?.count === submissions?.count}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        )}
      </Form>
    </div>
  );
}

const CustomButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button
      className={cn(
        "bg-accent text-primary border border-transparent hover:border-primary hover:bg-primary/20 data-[selected=true]:bg-primary/20 data-[selected=true]:border-primary",
        className
      )}
      {...props}
    />
  );
};
