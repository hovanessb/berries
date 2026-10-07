import { ORDER_URL } from "@/lib/toast/links";
import { SITE } from "@/lib/site";
import { HandoffLink } from "./HandoffLink";

export function OrderBar() {
  return (
    <div className="bb-orderbar">
      <span className="bb-orderbar__txt">
        Hungry?
        <small>Pickup or delivery from {SITE.address.street}</small>
      </span>
      <HandoffLink href={ORDER_URL} className="bb-btn bb-btn--sm">Order</HandoffLink>
    </div>
  );
}
