import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Warranty Policy | Industrial Area Spare Parts",
  description: "Read our return and warranty policy for auto spares, engines, and gearboxes.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[900px]">
      <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FFCD11] prose-a:no-underline hover:prose-a:underline">
        <h1>Return & Warranty Policy</h1>

        <p>
          At 4WD AutoSpares, we strive to provide high-quality spare parts. However, we understand that issues may arise. Please read our policy carefully.
        </p>

        <h2>Engines and Gearboxes</h2>
        <p>
          We offer a <strong>7-day return policy</strong> on defective engines and gearboxes.
        </p>
        <ul>
            <li>The item must be returned within 7 days of purchase.</li>
            <li>The item must be in the same condition as sold, without any disassembly or tampering.</li>
            <li>Original receipt is required for all returns.</li>
        </ul>

        <h2>Electrical Parts</h2>
        <p>
          <strong>No returns are accepted on electrical parts.</strong> Please ensure you have the correct diagnosis before purchasing electrical components such as sensors, ECUs, or wiring harnesses.
        </p>

        <h2>General Conditions</h2>
        <ul>
            <li>Goods once sold are not returnable for cash refund. Exchange or credit note may be issued at management&apos;s discretion.</li>
            <li>Warranty is void if the part has been damaged due to improper installation or misuse.</li>
            <li>Labor costs are not covered under warranty.</li>
        </ul>
      </article>
    </div>
  );
}
