import { ErrorBoundary } from "@/components/errors/error-boundary";
import { SearchForm } from "@/components/input/search";
import { TableSkeleton } from "@/components/skeleton/table";
import { PageHeading } from "@/components/typography/heading";
import QuestionTable from "@/features/quiz/components/question-table";
import { getQuestions } from "@/features/quiz/servers/question";
import { SearchParams } from "@/types/search-params";
import { Rows3 } from "lucide-react";
import React, { Suspense } from "react";

export default function QuestionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <PageHeading icon={<Rows3 />}>Questions</PageHeading>
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
  const response = await getQuestions(searchParams);

  return (
    <ErrorBoundary error={response.error}>
      <QuestionTable response={response} />
    </ErrorBoundary>
  );
};
