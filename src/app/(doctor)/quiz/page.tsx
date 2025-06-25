import { NoData } from "@/components/state/state";
import { Button } from "@/components/ui/button";
import { getQuizzes } from "@/features/quiz/servers/quiz";
import Link from "next/link";
import React from "react";

export default async function QuizPage() {
  const response = await getQuizzes();

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-semibold mb-6">
        <span className="text-primary">The World Brain Day</span> <br />{" "}
        Today&apos;s Special Quiz
      </h1>

      {response ? (
        <Button asChild>
          <Link href={`/quiz/${response.id}`}>Participate</Link>
        </Button>
      ) : (
        <NoData />
      )}
    </div>
  );
}
