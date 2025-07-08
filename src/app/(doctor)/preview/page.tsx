import React from "react";
import {
  getQuizSubmitWithQuestion,
  getQuizzesCount,
} from "@/features/quiz/servers/quiz";
import { verifyAutuser } from "@/lib/dal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NoData } from "@/components/state/state";
import { StateSection } from "@/components/section/section";
import { Check, X } from "lucide-react";

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

  if ((response?.count ?? 0) === 0)
    return (
      <StateSection>
        <NoData />
        <Button asChild className="min-w-[10rem]">
          <Link href={"/"}> Go Back</Link>
        </Button>
      </StateSection>
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 bg-background overflow-hidden w-fit px-2 py-1 rounded-md text-primary ml-auto border border-secondary/50 text-xs">
        <p>Correct Answers</p>
        <p className="font-semibold bg-secondary px-4 py-0.5 rounded-md text-foreground">
          {totalMark} / {quizCount}{" "}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {response?.data &&
          response.data.map((item: any, index) => (
            <article
              key={item.id}
              className="border p-4 rounded-md bg-background/85 backdrop-blur-lg"
            >
              <p className="mb-4">
                <span className="text-primary rounded-full">Q{index + 1}.</span>{" "}
                {item.question.title}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((value) => (
                  <div
                    key={value}
                    data-selected={value == item.answer}
                    data-correct={value === item.question.answer}
                    className="group bg-accent p-2 rounded-md text-sm flex items-center gap-5 border data-[selected=true]:bg-red-200 data-[correct=true]:bg-green-200 [[data-selected=true][data-correct=true]]:bg-green-200"
                  >
                    <div className="bg-secondary border border-secondary-foreground/50 size-6 aspect-square rounded-full flex justify-center items-center ">
                      <p>{value}</p>
                    </div>{" "}
                    {String(item?.question?.[`option_${value}`] || "")}
                    <Check className="ml-auto size-4 group-data-[correct=true]:inline hidden group-[[data-selected=true][data-correct=true]]:inline text-green-800" />
                    <X className="ml-auto size-4 group-data-[selected=true]:inline hidden group-[[data-selected=true][data-correct=true]]:hidden text-red-900" />
                  </div>
                ))}
              </div>
            </article>
          ))}
      </div>

      <Button className="w-fit min-w-[10rem] mx-auto mt-16 mb-10" asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
}
