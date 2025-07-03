import { StateSection } from "@/components/section/section";
import { NoData } from "@/components/state/state";
import { Button } from "@/components/ui/button";
import { addParticipate } from "@/features/participate/actions/participate";
import QuizContainer from "@/features/quiz/components/quiz-container";
import { getQuizSubmit, getQuizzes } from "@/features/quiz/servers/quiz";
import { verifyAutuser } from "@/lib/dal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function QuizPage() {
  const authUser = await verifyAutuser();

  const question = await getQuizzes();
  const submissions = await getQuizSubmit(authUser?.id as string);

  if (submissions?.count ?? 0 > 0)
    return (
      <div className="min-h-[50vh] flex flex-col gap-3 justify-center items-center">
        <div className="relative w-20 aspect-square">
          <Image src={"/images/submit.png"} alt="submit icon" fill />
        </div>
        <p className="text-xs">You already participated</p>

        <div className="flex items-center gap-5 mt-10">
          <Button variant={"outline"}>
            <Link href={"/preview"}>Preview</Link>
          </Button>
          <Button asChild>
            <Link href={"/"}>Go Back</Link>
          </Button>
        </div>
      </div>
    );

  if (question?.count === 0) {
    return (
      <StateSection>
        <NoData />
        <Button asChild className="min-w-[10rem]">
          <Link href={"/"}> Go Back</Link>
        </Button>
      </StateSection>
    );
  }

  // on entering this page, create a participation data
  await addParticipate({
    doctor_id: authUser?.id as string,
    group_id: question?.data[0].group_id ?? "",
  });

  return (
    <QuizContainer
      question={question}
      submissions={submissions}
      doctor_id={authUser?.id}
    />
  );
}
