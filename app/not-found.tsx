import Link from "next/link";
import { Iris } from "@/components/Deco";

export default function NotFound() {
  return (
    <div className="section--rings" style={{ paddingBottom: 96 }}>
      <Iris />
      <div className="bb-pagehead wrap">
        <h1 className="bb-display">86&apos;d</h1>
        <p>That page isn’t on the menu. Head back to the counter.</p>
        <p style={{ marginTop: 32 }}><Link href="/menu" className="bb-btn bb-btn--cream">See the menu</Link></p>
      </div>
    </div>
  );
}
