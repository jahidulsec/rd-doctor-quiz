import { getQuizSubmit, getQuizzes } from "@/features/quiz/servers/quiz";
import BannerSection from "@/features/home/components/banner-section";
import QuizSection from "@/features/home/components/quiz-section";
import React from "react";
import { verifyAutuser } from "@/lib/dal";

export default async function HomeContainer() {
  const authUser = await verifyAutuser();

  const response = await getQuizzes();
  const submissionResponse = await getQuizSubmit(authUser?.id ?? "");

  return (

    <div className="flex flex-col gap-4">
        {JSON.stringify(submissionResponse)}
      <BannerSection />

      {/* quiz */}
      <QuizSection count={response?.count ?? 0} />
    </div>
  );
}
