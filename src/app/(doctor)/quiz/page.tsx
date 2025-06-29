// import { NoQuizData } from "@/components/state/state";
// import { Button } from "@/components/ui/button";
// import { getQuizSubmit, getQuizzes } from "@/features/quiz/servers/quiz";
// import { verifyAutuser } from "@/lib/dal";
// import Link from "next/link";
import LogoFull from "@/components/logo/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain } from "lucide-react";
import React from "react";

export default async function QuizPage() {
  // const authUser = await verifyAutuser();

  // const response = await getQuizzes();
  // const submissionResponse = await getQuizSubmit(authUser?.id ?? "");

  return (
    // <div className="flex flex-col gap-5 items-center">
    //   <h1 className="text-2xl font-semibold mb-6">
    //     <span className="text-primary">The World Brain Day</span> <br />{" "}
    //     Today&apos;s Special Quiz
    //   </h1>

    //   {response ? (
    //     submissionResponse ? (
    //       <Button
    //         variant={"outline"}
    //         className="text-secondary border-secondary"
    //       >
    //         Participated
    //       </Button>
    //     ) : (
    //       <Button asChild>
    //         <Link href={`/quiz/${response.id}`}>Participate</Link>
    //       </Button>
    //     )
    //   ) : (
    //     <NoQuizData />
    //   )}
    // </div>
    <div className="flex flex-col gap-4">
      {/* banner */}
      <div className=" isolate bg-primary/95 p-6 rounded-md flex justify-between items-center flex-wrap gap-5 relative overflow-hidden backdrop-blur-2xl ">
        <LogoFull className="text-primary-foreground" width={220} />

        <div className="w-full flex justify-between items-center gap-5 flex-wrap-reverse">
          <Button variant={"outline"} className="md:w-fit w-full">
            Get Started <ArrowRight />
          </Button>

          <h1 className="text-right items-end self-end md:w-fit w-full">
            <span className="text-primary-foreground">The World Brain Day</span>{" "}
            <br />
            <strong className="text-xl text-primary-foreground">
              Special Quiz
            </strong>
          </h1>
        </div>

        <LogoFull
          className="absolute -right-105 -bottom-15 -z-10 text-accent opacity-10"
          width={520}
        />
      </div>

      {/* quiz */}
      <section>
        <h2 className="font-semibold mb-3">Recent</h2>

        {/* quiz card */}
        <div className="bg-accent rounded-md p-4 flex justify-between items-center flex-wrap gap-5">
          {/* left */}
          <div className="flex items-center gap-3">
            {/* icon */}
            <div className="bg-primary/25 p-3 rounded-md">
              <Brain className="text-primary size-6" />
            </div>

            {/* information */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">Today&apos;s Quiz</h3>
              <p className="text-muted-foreground text-sm">3 Questions</p>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col items-end gap-3">
            <Badge variant={"outline"} className="bg-yellow-50 text-yellow-700">
              Incomplete
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
