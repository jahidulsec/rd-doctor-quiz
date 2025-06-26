import { ErrorBoundary } from "@/components/errors/error-boundary";
import { TableSkeleton } from "@/components/skeleton/table";
import { PageHeading } from "@/components/typography/heading";
import DoctorTable from "@/features/doctor/components/doctor-table";
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
      <PageHeading icon={<Users />}>Doctor</PageHeading>
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
