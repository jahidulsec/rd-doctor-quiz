import { ErrorBoundary } from "@/components/errors/error-boundary";
import { StateSection } from "@/components/section/section";
import { NoData } from "@/components/state/state";
import { Button } from "@/components/ui/button";
import LeaderboardSection from "@/features/result/components/leaderboard-section";
import { getResults } from "@/features/result/servers/result";
import { verifyAutuser } from "@/lib/dal";
import Link from "next/link";
import React from "react";

export default async function LeaderboardPage() {
  const authuser = await verifyAutuser();
  const results = await getResults({ page: 1, size: 20 });
  const resultUser = await getResults({
    page: 1,
    size: 1,
    search: authuser?.id,
  });

  return (
    <ErrorBoundary error={results.error || resultUser.error}>
      {results.count > 0 ? (
        <LeaderboardSection userData={resultUser.data} data={results.data} />
      ) : (
        <StateSection>
          <NoData />
          <Button asChild className="min-w-[10rem]">
            <Link href={"/"}> Go Back</Link>
          </Button>
        </StateSection>
      )}
    </ErrorBoundary>
  );
}
