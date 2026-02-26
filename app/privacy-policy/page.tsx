import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Industrial Area Spare Parts",
  description: "Learn how we protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[900px]">
      <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#FFCD11] prose-a:no-underline hover:prose-a:underline">
        <h1>Privacy Policy</h1>

        <p>
          Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our services.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, phone number, and email address when you:
        </p>
        <ul>
            <li>Request a part via our website.</li>
            <li>Contact us via WhatsApp or phone.</li>
            <li>Create a personalized garage profile.</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use your information solely for the purpose of fulfilling your spare part requests and improving our services. Specifically:
        </p>
        <ul>
            <li>To contact you regarding the availability and pricing of parts you requested.</li>
            <li>To facilitate delivery of purchased parts.</li>
            <li>To communicate via WhatsApp for faster service.</li>
        </ul>

        <h2>Data Protection</h2>
        <p>
          <strong>We do not sell, trade, or rent your personal identification information to third parties.</strong>
        </p>
        <p>
          Your data is securely stored and is only accessible to authorized personnel for business purposes.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </article>
    </div>
  );
}
