import SubmitForm from "@/features/quiz/components/submit-form";
import { getQuiz } from "@/features/quiz/servers/quiz";
import { verifyAutuser } from "@/lib/dal";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import React from "react";

export default async function QuizDetailsPage({ params }: { params: Params }) {
  const { id } = await params;

  const authUser = await verifyAutuser();

  const response = await getQuiz(id?.toString() ?? "");

  if (!response) return notFound();

  return (
    <div>
      <p className="text-xl font-semibold">{response?.title}</p>

      {/* options */}
      <SubmitForm
        id={id?.toString() ?? ""}
        userId={authUser?.id}
        response={response}
      />
    </div>
  );
}
