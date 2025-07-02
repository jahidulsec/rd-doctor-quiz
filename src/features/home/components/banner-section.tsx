import { LogoFull, LogoIcon } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BannerSection({
  submissionCount,
  count,
}: {
  submissionCount: number;
  count: number;
}) {
  return (
    <>
      {/* banner */}
      <div className="isolate bg-primary p-6 rounded-md flex justify-center items-center flex-col gap-6 relative overflow-hidden backdrop-blur-2xl">
        <LogoFull
          className="text-primary-foreground md:w-[220px] w-[180px]"
          width={220}
        />

        <h1 className="text-center md:w-fit w-full">
          <span className="text-primary-foreground text-xl">
            The World Brain Day
          </span>{" "}
          <br />
          <strong className="text-2xl text-primary-foreground">
            Special Quiz
          </strong>
        </h1>

        {count == 0 &&
          (submissionCount > 0 ? (
            <Button
              variant={"outline"}
              className="md:w-fit w-full hover:border-secondary"
              asChild
            >
              <Link href={"/preview"}>
                Preview <ArrowUpRight />
              </Link>
            </Button>
          ) : (
            <Button
              variant={"outline"}
              className="md:w-fit w-full hover:border-secondary"
              asChild
            >
              <Link href={"/quiz"}>
                Get Started <ArrowRight />
              </Link>
            </Button>
          ))}

        <LogoIcon
          className="absolute -right-1 -bottom-10 -z-10 text-accent opacity-10"
          width={150}
        />
      </div>
    </>
  );
}
