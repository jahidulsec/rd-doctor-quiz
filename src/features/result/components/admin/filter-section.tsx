"use client"

import React from "react";
import { mio } from "@prisma/client";
import Combobox from "@/components/combobox/combobox";
import { getTerritories } from "@/features/territory/lib/territory";

export default function FilterSection() {
  return (
    <Combobox
      fetcher={(params) => getTerritories({ ...params }) as any}
      paramName="sap_code"
      getKey={(item: mio) => item.sap_territory_code}
      getLabel={(item: mio) => `${item.area_name} (${item.sap_territory_code})`}
    />
  );
}
