"use server";

import { apiResponse } from "@/lib/response";
import { baseQuerySchema, BaseQueryType } from "@/schema/query";
import { Prisma } from "@prisma/client";
import db from "../../../../db/db";

export const getTerritories = async (query: BaseQueryType) => {
  try {
    const { page, size, search } = baseQuerySchema.parse(query);

    const filter: Prisma.mioWhereInput = {
      sap_territory_code: {
        contains: search,
      },
    };

    const [data, count] = await Promise.all([
      db.mio.findMany({
        where: filter,
        skip: (page! - 1) * size!,
        take: size!,
      }),
      db.mio.count({ where: filter }),
    ]);

    return apiResponse.multi({ data, count });
  } catch (error) {
    return apiResponse.error({ error });
  }
};
