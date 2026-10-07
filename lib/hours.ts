/** Posted hours, in the shop's own time zone. Keep in sync with Toast. */
export const TIME_ZONE = "America/Los_Angeles";

// 0 = Sunday … 6 = Saturday. [open, close] in 24h hours.
export const HOURS: Record<number, [number, number]> = {
  0: [10, 19],
  1: [7, 21],
  2: [7, 21],
  3: [7, 21],
  4: [7, 21],
  5: [7, 21],
  6: [10, 19],
};

export const HOURS_TEXT = [
  { days: "Mon–Fri", time: "7am – 9pm" },
  { days: "Sat–Sun", time: "10am – 7pm" },
];

function shopNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

export function isOpenByHours(date = new Date()) {
  const { day, hour } = shopNow(date);
  const [open, close] = HOURS[day];
  return hour >= open && hour < close;
}

/** True before 11am shop time — used to lead with breakfast items. */
export function isMorning(date = new Date()) {
  return shopNow(date).hour < 11;
}
