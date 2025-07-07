import {
  getQuizSubmitWithQuestion,
  getQuizzes,
} from "@/features/quiz/servers/quiz";
import QuizSection from "@/features/home/components/quiz-section";
import React from "react";
import { verifyAutuser } from "@/lib/dal";
import { LogoFull, LogoIcon } from "@/components/logo/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuaters } from "@/features/quater/servers/quater";
import { format } from "date-fns";

export default async function HomeContainer() {
  const authUser = await verifyAutuser();

  // get a active quater
  const quaters = await getQuaters({
    size: "1",
    page: "1",
  });
  const quizzes = await getQuizzes();
  const submissionResponse = await getQuizSubmitWithQuestion(
    authUser?.id ?? ""
  );

  let totalMark = 0;

  for (let i = 0; i < (submissionResponse?.count ?? 0); i++) {
    if (
      submissionResponse?.data?.[i].answer ===
      submissionResponse?.data?.[i].question.answer
    ) {
      totalMark += 1;
    }
  }

  const quizCount = quizzes?.count ?? 0;

  return (
    <div className="flex flex-col gap-4">
      {/* banner */}
      <div className="isolate bg-primary p-6 rounded-md flex justify-center items-center flex-col gap-6 relative overflow-hidden backdrop-blur-2xl">
        <LogoFull
          className="text-primary-foreground md:w-[220px] w-[180px]"
          width={220}
        />

        <h1 className="text-center md:w-fit w-full my-6">
          <span className="text-primary-foreground text-xl">
            The World Brain Day
          </span>{" "}
          <br />
          <strong className="text-2xl text-primary-foreground">
            Special Quiz
          </strong>
        </h1>

        {quaters.count !== 0 &&
        quaters.data[0].start_date < new Date() &&
        quaters.data[0].end_date > new Date() ? (
          <>
            {/* quiz */}
            <QuizSection
              quizId={quizzes?.data[0].id ?? ""}
              count={quizCount}
              submissionCount={submissionResponse?.count ?? 0}
              totalMark={totalMark}
            />

            {quizCount > 0 ? (
              Number(submissionResponse?.count) > 0 ? null : (
                <Button
                  variant={"outline"}
                  className="md:w-fit w-full hover:border-secondary"
                  asChild
                >
                  <Link href={"/quiz"}>
                    Start Quiz <ArrowRight />
                  </Link>
                </Button>
              )
            ) : null}
          </>
        ) : (
          // if not started, show this message
          <p className="text-background text-center border p-4 rounded-md border-secondary-foreground">
            The Quiz will start from <br /> <br />
            <strong className="text-xl text-secondary border p-3 rounded-md backdrop-blur-sm">
              {format(quaters.data[0].start_date, "LLL dd, yy")}
            </strong>
            <br /> <br />
            You&apos;ll receive a daily SMS when the quiz starts
          </p>
        )}

        <LogoIcon
          className="absolute -right-1 -bottom-10 -z-10 text-accent opacity-10"
          width={150}
        />
      </div>
    </div>
  );
}
