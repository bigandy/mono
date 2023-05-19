import { format } from "date-fns";

export const niceActivityDate = (date: string) => {
  return format(new Date(date), "dd-MM-yyyy 'at' h:mm aaa");
};
