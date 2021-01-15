import { format, isValid, parse } from "date-fns";

export function iso(date) {
  let parsed = parse(date, "M/d/yy", new Date());
  return isValid(parsed) ? format(parsed, "yyyy-MM-dd") : date;
}
