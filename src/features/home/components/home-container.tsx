import {
  getQuizSubmitWithQuestion,
  getQuizzesCount,
} from "@/features/quiz/servers/quiz";
import BannerSection from "@/features/home/components/banner-section";
import QuizSection from "@/features/home/components/quiz-section";
import React from "react";
import { verifyAutuser } from "@/lib/dal";

export default async function HomeContainer() {
  const authUser = await verifyAutuser();

  const quizCount = await getQuizzesCount();
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

  return (
    <div className="flex flex-col gap-4">
      <BannerSection count={quizCount} submissionCount={submissionResponse?.count ?? 0} />

      {/* quiz */}
      <QuizSection
        count={quizCount}
        submissionCount={submissionResponse?.count ?? 0}
        totalMark={totalMark}
      />
    </div>
  );
}
