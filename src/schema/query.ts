import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/data";
import { z } from "zod";

export const baseQuerySchema = z.object({
  page: z.number().default(DEFAULT_PAGE).optional(),
  size: z.number().default(DEFAULT_PAGE_SIZE).optional(),
  search: z.string().optional(),
});

export type BaseQueryType = z.infer<typeof baseQuerySchema>;
