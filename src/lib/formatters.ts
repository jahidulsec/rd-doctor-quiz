import { format } from "date-fns";

const NUMBER_FORMATTER = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export const formatNumber = (number: number) => {
  return NUMBER_FORMATTER.format(number);
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-us", {
  dateStyle: "medium",
});

export const formatDate = (date: Date) => {
  if (date == null) return `-`;
  return DATE_FORMATTER.format(date);
};

export const formatDateTime = (date: Date) => {
  if (date == null) return `-`;
  return format(date, "LLL dd, yyyy - hh:mm aaa");
};

export const titleCase = (str: string) => {
  if (str == null) return;
  const word: any = str
    .toLowerCase()
    .split(" ")
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });

  return word.join(" ");
};

export const timeConversion = (milliseconds: number) => {
  if (!milliseconds) return 0;
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  let time = hours !== 0 ? `${hours}h` : ``;
  time += minutes !== 0 ? ` ${minutes}m` : ``;
  time += ` ${seconds}s`;
  return time;
};
