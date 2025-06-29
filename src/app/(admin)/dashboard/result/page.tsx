import { ErrorBoundary } from "@/components/errors/error-boundary";
import { SearchForm } from "@/components/input/search";
import { TableSkeleton } from "@/components/skeleton/table";
import { PageHeading } from "@/components/typography/heading";
import ResultTable from "@/features/result/components/result-table";
import { getResults } from "@/features/result/servers/result";
import { SearchParams } from "@/types/search-params";
import { List } from "lucide-react";
import React, { Suspense } from "react";

export default function ResultPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <PageHeading icon={<List />}>Results</PageHeading>
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableSection searchParams={searchParams} />
      </Suspense>
    </>
  );
}

const TableSection = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const response = await getResults(searchParams);

  return (
    <ErrorBoundary error={response.error}>
      <ResultTable response={response} />
    </ErrorBoundary>
  );
};
