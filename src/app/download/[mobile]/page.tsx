import React from "react";
import db from "../../../../db/db";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import ImageSection from "@/features/download/components/image-section";
import NavRegister from "@/features/nav-bar/components/nav-register";

export default async function DownloadImagePage({
  params,
}: {
  params: Params;
}) {
  const { mobile } = await params;

  const doctor = await db.doctor.findUnique({
    where: {
      mobile: mobile as string,
    },
  });

  if (!doctor) return notFound();

  return (
    <>
      <NavRegister />
      <main className="flex justify-center items-center min-h-[calc(100svh-3rem)] mt-6">
        <ImageSection
          name={doctor.full_name}
          mobile={doctor.mobile}
          src={`/api/image${doctor.image}`}
        />
      </main>
    </>
  );
}
