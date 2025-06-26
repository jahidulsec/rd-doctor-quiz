import { ErrorBoundary } from "@/components/errors/error-boundary";
import { SearchForm } from "@/components/input/search";
import { TableSkeleton } from "@/components/skeleton/table";
import { PageHeading } from "@/components/typography/heading";
import DoctorTable from "@/features/doctor/components/doctor-table";
import ExportSection from "@/features/doctor/components/export-section";
import { getDoctors } from "@/features/doctor/servers/doctor";
import { SearchParams } from "@/types/search-params";
import { Users } from "lucide-react";
import { Suspense } from "react";

export default function DoctorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <>
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <PageHeading icon={<Users />}>Doctor</PageHeading>
        <Suspense>
          <SearchForm />
        </Suspense>
        <ExportSection />
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
  const response = await getDoctors(searchParams);

  return (
    <ErrorBoundary error={response.error}>
      <DoctorTable response={response} />
    </ErrorBoundary>
  );
};
