import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYearRange(year: number) {
  return {
    gte: new Date(`${year}-01-01T00:00:00.000Z`),
    lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
  };
}

export function getDateRange(date: Date) {
  return {
    gte: new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T00:00:00.000Z`
    ),
    lt: new Date(
      `${date.getFullYear()}-${date.getMonth()}-${
        date.getDate() + 1
      }T00:00:00.000Z`
    ),
  };
}

export const range = (start: number, stop: number, step: number = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
