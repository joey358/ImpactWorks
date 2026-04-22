import Link from "next/link";

const variants = [
  {
    slug: "connected",
    title: "V4 · Connected Community ★",
    tagline: "Evolved from V1+V2. Community photo + animated service-wires connecting people to the 6 core sectors. Stats fold into a warm horizon band at the base of the hero — no more dark navy anywhere.",
    vibe: "Most distinctive. Encodes what Impact Works actually does (connects people → services) in the hero visual itself. Kills the second dark-navy stats moment.",
    featured: true,
  },
  {
    slug: "warm",
    title: "V1 · Warm Community",
    tagline: "Full-bleed community photo, cream gradient overlay, orange accents.",
    vibe: "Most human. Photo leads the story. Best if the photo resonates emotionally.",
  },
  {
    slug: "split",
    title: "V2 · Split Editorial",
    tagline: "Left: crisp copy on white. Right: rounded photo card with network badge.",
    vibe: "Most editorial. Strongest hierarchy & readability. Balances human + data.",
  },
  {
    slug: "sunlight",
    title: "V3 · Sunlight Gradient",
    tagline: "No photo — warm cream→peach→gold gradient with soft sunrise arcs.",
    vibe: "Most abstract. Keeps the tech-forward feel but trades navy for sunlight.",
  },
];

export default function PreviewIndex() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-orange mb-4">Design Exploration</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">Lighter Direction — 3 Variations</h1>
        <p className="text-slate-600 text-lg max-w-2xl mb-12">
          Each variation reuses your brand palette and sections below the hero. Only the <strong>hero</strong> and <strong>stats</strong> block change. Live site at <code>/</code> is untouched.
        </p>

        <div className="grid gap-4">
          {variants.map((v) => (
            <Link
              key={v.slug}
              href={`/preview/${v.slug}`}
              className={`block rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all ${
                v.featured
                  ? "bg-gradient-to-br from-white to-[#FFF4E0] border-2 border-brand-orange/40 shadow-md"
                  : "bg-white border border-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-800 mb-2">{v.title}</h2>
                  <p className="text-slate-600 mb-2">{v.tagline}</p>
                  <p className="text-sm text-slate-500 italic">{v.vibe}</p>
                </div>
                <span className="text-brand-orange font-bold text-2xl">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/60 rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-600">
            <strong className="text-slate-800">Branch:</strong> <code>staging/lighter-design</code> · Live <code>/</code> is unchanged. Pick a favorite, I&apos;ll promote it.
          </p>
        </div>
      </div>
    </div>
  );
}
