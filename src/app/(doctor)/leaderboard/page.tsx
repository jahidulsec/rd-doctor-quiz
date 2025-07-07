import { ErrorBoundary } from "@/components/errors/error-boundary";
import { StateSection } from "@/components/section/section";
import { NoData } from "@/components/state/state";
import { Button } from "@/components/ui/button";
import { getQuaters } from "@/features/quater/servers/quater";
import LeaderboardSection from "@/features/result/components/leaderboard-section";
import { getResults } from "@/features/result/servers/result";
import { verifyAutuser } from "@/lib/dal";
import Link from "next/link";
import React from "react";

export default async function LeaderboardPage() {
  const size = 50;

  const authuser = await verifyAutuser();
  const quaters = await getQuaters({
    size: "1",
    page: "1",
  });
  const results = await getResults({ page: 1, size: size });
  const resultUser = await getResults({
    page: 1,
    size: 1,
    search: authuser?.id,
  });

  return (
    <>
      {quaters.count !== 0 &&
      quaters.data[0].start_date < new Date() &&
      quaters.data[0].end_date > new Date() ? (
        <ErrorBoundary error={results.error || resultUser.error}>
          {results.count > 0 ? (
            <LeaderboardSection
              userData={resultUser.data}
              data={results.data}
              size={size}
            />
          ) : (
            <StateSection>
              <NoData />
              <Button asChild className="min-w-[10rem]">
                <Link href={"/"}> Go Back</Link>
              </Button>
            </StateSection>
          )}
        </ErrorBoundary>
      ) : (
        <StateSection>
          <NoData />
          <Button asChild className="min-w-[10rem]">
            <Link href={"/"}> Go Back</Link>
          </Button>
        </StateSection>
      )}
    </>
  );
}
