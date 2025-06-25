import SubmitForm from "@/features/quiz/components/submit-form";
import { getQuiz, getQuizSubmit } from "@/features/quiz/servers/quiz";
import { verifyAutuser } from "@/lib/dal";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import React from "react";

export default async function QuizDetailsPage({ params }: { params: Params }) {
  const { id } = await params;

  const authUser = await verifyAutuser();

  const response = await getQuiz(id?.toString() ?? "");
  const submissionResponse = await getQuizSubmit(authUser?.id ?? "");

  if (!response) return notFound();

  return (
    <div>
      <p className="text-xl font-semibold">{response?.title}</p>

      <SubmitForm
        id={id?.toString() ?? ""}
        userId={authUser?.id}
        response={response}
        quizSubmitResponse={submissionResponse ?? undefined}
      />
    </div>
  );
}
