import QuizContainer from "@/features/quiz/components/quiz-container";
import { getQuizSubmit, getQuizzes } from "@/features/quiz/servers/quiz";
import { verifyAutuser } from "@/lib/dal";
import React from "react";

export default async function QuizPage() {
  const authUser = await verifyAutuser();

  const question = await getQuizzes();
  const submissions = await getQuizSubmit(authUser?.id as string);

  return (
    <QuizContainer
      question={question}
      submissions={submissions}
      doctor_id={authUser?.id}
    />
  );
}
