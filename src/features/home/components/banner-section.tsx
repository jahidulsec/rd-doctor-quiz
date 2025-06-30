import { LogoFull, LogoIcon } from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BannerSection() {
  return (
    <section>
      {/* banner */}
      <div className="isolate bg-primary p-6 rounded-md flex justify-between items-center flex-wrap gap-2 relative overflow-hidden backdrop-blur-2xl">
        <LogoFull
          className="text-primary-foreground md:w-[220px] w-[120px]"
          width={220}
        />

        <div className="w-full flex justify-between items-start gap-5 flex-wrap-reverse">
          <Button
            variant={"outline"}
            className="md:w-fit w-full hover:border-secondary"
            asChild
          >
            <Link href={"/quiz"}>
              Get Started <ArrowRight />
            </Link>
          </Button>

          <h1 className="text-center md:w-fit w-full">
            <span className="text-primary-foreground text-xl">
              The World Brain Day
            </span>{" "}
            <br />
            <strong className="text-2xl text-primary-foreground">
              Special Quiz
            </strong>
          </h1>
        </div>

        <LogoIcon
          className="absolute -right-1 -bottom-10 -z-10 text-accent opacity-10"
          width={150}
        />
      </div>
    </section>
  );
}
