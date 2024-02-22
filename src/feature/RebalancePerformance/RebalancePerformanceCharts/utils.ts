import dayjs from "dayjs";

export const tickFormatter = (e: string) => {
  return dayjs(e).format("MMM DD");
};
