import { ORDER_URL } from "@/lib/toast/links";
import { HandoffLink } from "./HandoffLink";

export function OpenBanner({ open }: { open: boolean }) {
  return (
    <div className={`bb-banner${open ? "" : " bb-banner--closed"}`}>
      <span className="bb-banner__dot" aria-hidden="true" />
      <span>{open ? "Open now. Order ahead and skip the line." : "Closed right now. We open at 7am on weekdays and 10am on weekends."}</span>
      <HandoffLink href={ORDER_URL}>{open ? "Order pickup" : "Schedule an order"}</HandoffLink>
    </div>
  );
}
