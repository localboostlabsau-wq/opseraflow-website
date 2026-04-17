import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog – AI Automation Insights for Dental Clinics",
  description:
    "Expert insights on AI automation, dental practice management, compliance, and growth strategies for Australian dental clinics.",
  alternates: { canonical: "https://opseraflow.com.au/blog" },
};

const posts = [
  {
    slug: "hidden-cost-manual-admin-dental",
    title: "The Hidden Cost of Manual Admin in Australian Dental Practices",
    excerpt:
      "Most dental practice owners significantly underestimate how much manual administrative work is costing their clinic — in time, revenue, and team morale.",
    date: "April 2025",
    category: "Operations",
    readTime: "5 min read",
  },
  {
    slug: "ai-automation-privacy-act-australia",
    title: "AI Automation and the Australian Privacy Act: What Clinic Owners Need to Know",
    excerpt:
      "Adopting AI automation in your dental practice doesn't mean compromising on patient privacy. Here's how to stay fully compliant.",
    date: "April 2025",
    category: "Compliance",
    readTime: "7 min read",
  },
  {
    slug: "reducing-no-shows-40-percent",
    title: "How Forward-Thinking Dental Clinics Are Reducing No-Shows by 40%",
    excerpt:
      "No-shows cost Australian dental practices thousands of dollars every week. Intelligent automation is changing that — here's how.",
    date: "March 2025",
    category: "Growth",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f0f4ff] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#00d4ff] border border-[#00d4ff]/30 bg-[#00d4ff]/5 mb-6">
            Insights
          </span>
          <h1 className="text-5xl font-bold mb-4">
            Resources &amp;{" "}
            <span style={{ background: "linear-gradient(135deg,#00d4ff,#66e8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Insights
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Expert thinking on AI automation, dental operations, compliance, and the future of practice management in Australia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-[#00d4ff]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#00d4ff] bg-[#00d4ff]/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-white font-bold text-lg leading-snug">{post.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs text-gray-600">{post.date}</span>
                <span className="text-xs text-[#00d4ff] font-medium">Coming soon →</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center glass-strong rounded-2xl p-10">
          <p className="text-gray-400 mb-2">More articles coming soon.</p>
          <p className="text-white font-semibold mb-6">Subscribe to stay ahead of the curve.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#00d4ff] transition-all"
            />
            <button className="px-6 py-3 rounded-xl bg-[#00d4ff] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all">
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#00d4ff] hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
