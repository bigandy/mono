import { format, isYesterday } from "date-fns";
import isToday from "date-fns/isToday";

export const niceActivityDate = (date: string) => {
  const activityDate = new Date(date);

  const prefix =
    (isToday(activityDate) && "'Today'") ||
    (isYesterday(activityDate) && "'Yesterday'") ||
    "dd MMM yyyy";
  return format(activityDate, `${prefix} 'at' HH:mm`);
};
