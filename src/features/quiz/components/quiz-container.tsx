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
import { CircleCheckBig } from "lucide-react";

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
  const router = useRouter();

  const currentQuestion = question?.data?.[submitCount];

  const handleNext = () => {
    if (!currentQuestion || checkedValue === undefined) return;

    setSubmitResponse((prev) => [
      ...prev,
      {
        doctor_id,
        question_id: currentQuestion.id,
        answer: checkedValue,
        group_id: currentQuestion.group_id,
        correct_answer: currentQuestion.answer,
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
        router.push("/preview");
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
          <span className="text-secondary-foreground">{submitCount}</span>/
          {question?.count}
        </p>
        <Progress
          className="mt-3"
          value={(submitCount * 100) / (question?.count ?? 1)}
        />
      </div>

      {/* Question Form */}
      <Form className="mt-6">
        {currentQuestion ? (
          <>
            <div className="text- font-semibold rounded-md bg-secondary/50 min-h-20 p-4 text-foreground border border-secondary-foreground/35 relative flex gap-3">
              <p className="text-primary">Q{submitCount + 1}.</p>{" "}
              <p>{currentQuestion?.title}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((val) => (
                <CustomButton
                  key={val}
                  type="button"
                  data-selected={checkedValue === val}
                  onClick={() => setCheckedValue(val)}
                >
                  <div className="size-5 bg-secondary rounded-full text-xs text-foreground border border-secondary-foreground/50">
                    {val}
                  </div>
                  <div>
                    {String(
                      currentQuestion?.[`option_${val}` as keyof question]
                    ) || ""}
                  </div>
                </CustomButton>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-3 my-6">
            <CircleCheckBig className="size-20 text-green-500/50" />{" "}
            <p className="text-sm">Submit your response.</p>
          </div>
        )}

        {(question?.count ?? 0) > submitCount ? (
          <Button
            type="button"
            className="mt-4 w-fit min-w-[10rem] mx-auto mb-10"
            onClick={handleNext}
            disabled={checkedValue === undefined}
          >
            Next
          </Button>
        ) : (
          <Button
            type="button"
            className="w-fit min-w-[10rem] mx-auto flex items-center"
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
      type="button"
      className={cn(
        "bg-accent h-fit text-wrap whitespace-normal text-primary flex items-center justify-start gap-6 border border-secondary hover:border-primary hover:bg-primary/20 data-[selected=true]:bg-primary/20 data-[selected=true]:border-primary",
        className
      )}
      {...props}
    />
  );
};
