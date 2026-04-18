import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OpseraFlow Privacy Policy – how we collect, use, and protect your information in accordance with the Australian Privacy Act 1988.",
  alternates: { canonical: "https://opseraflow.com.au/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f0f4ff] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: April 2025</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
            <p>OpseraFlow Pty Ltd (&quot;OpseraFlow&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting the privacy of individuals in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs). This policy explains how we collect, use, store, and disclose personal information.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p>We collect personal information necessary to provide our services, including: contact details (name, email, phone), clinic information, and usage data from our platform. We do not collect sensitive health information directly from patients.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Data Storage &amp; Sovereignty</h2>
            <p>All data is stored exclusively on Australian servers. We do not transfer personal information outside of Australia without your explicit consent or where required by law.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Use of Information</h2>
            <p>Information is used solely to deliver our services, communicate with you about your account, and improve our platform. We do not sell or share personal information with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Security</h2>
            <p>We employ enterprise-grade security measures including AES-256 encryption, role-based access controls, and continuous monitoring to protect your information.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Access &amp; Correction</h2>
            <p>You have the right to access and correct personal information we hold about you. Contact us at <a href="mailto:info@opseraflow.com.au" className="text-[#00d4ff] hover:underline">info@opseraflow.com.au</a> to make a request.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
            <p>For privacy enquiries, contact our Privacy Officer at <a href="mailto:info@opseraflow.com.au" className="text-[#00d4ff] hover:underline">info@opseraflow.com.au</a>.</p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-[#00d4ff] hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
