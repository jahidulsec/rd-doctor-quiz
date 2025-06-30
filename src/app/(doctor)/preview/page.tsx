import React from "react";
import {
  getQuizSubmitWithQuestion,
  getQuizzesCount,
} from "@/features/quiz/servers/quiz";
import { verifyAutuser } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PreviewPage() {
  const authUser = await verifyAutuser();
  const response = await getQuizSubmitWithQuestion(authUser?.id ?? "");
  const quizCount = await getQuizzesCount();

  let totalMark = 0;

  for (let i = 0; i < (response?.count ?? 0); i++) {
    if (response?.data?.[i].answer === response?.data?.[i].question.answer) {
      totalMark += 1;
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 bg-accent w-fit px-2 py-1 rounded-md text-primary ml-auto border border-secondary">
        <p>Mark</p>
        <p className="font-semibold bg-secondary/15 px-4 py-0.5 rounded-md text-foreground">{totalMark} / {quizCount}{" "}</p>
      </div>

      <div className="flex flex-col gap-6">
        {response?.data &&
          response.data.map((item: any, index) => (
            <article key={item.id} className="border p-4 rounded-md">
              <p className="mb-4">
                <span className="text-primary rounded-full">Q{index + 1}.</span>{" "}
                {item.question.title}
              </p>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((value) => (
                  <div
                    key={value}
                    data-selected={value == item.answer}
                    data-correct={value === item.question.answer}
                    className="bg-accent p-2 rounded-md text-sm flex items-center gap-5 data-[selected=true]:bg-red-100 data-[correct=true]:bg-green-100 [[data-selected=true][data-correct=true]]:bg-green-100"
                  >
                    <div className="bg-secondary size-6 aspect-square rounded-full flex justify-center items-center ">
                      <p>{value}</p>
                    </div>{" "}
                    {String(item?.question?.[`option_${value}`] || "")}
                  </div>
                ))}
              </div>
            </article>
          ))}
      </div>

      <Button className="w-fit min-w-[10rem] mx-auto mt-16" asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
}
