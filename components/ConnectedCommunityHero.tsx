"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Chip = {
  label: string;
  dot: string;
  // position relative to the photo canvas (% within the canvas)
  // chips can extend outside the photo via negative values or >100
  top: string;
  left?: string;
  right?: string;
  // anchor = the point inside the photo the wire originates from (%)
  anchor: { x: number; y: number };
  delay: number;
};

const chips: Chip[] = [
  { label: "Housing",       dot: "#2E8BC0", top: "8%",   right: "-8%",  anchor: { x: 55, y: 58 }, delay: 0.0 },
  { label: "Healthcare",    dot: "#E8751A", top: "38%",  right: "-14%", anchor: { x: 58, y: 62 }, delay: 0.15 },
  { label: "Food",          dot: "#3DAA5C", top: "68%",  right: "-8%",  anchor: { x: 52, y: 65 }, delay: 0.3 },
  { label: "Jobs",          dot: "#F5A623", top: "92%",  right: "18%",  anchor: { x: 48, y: 64 }, delay: 0.45 },
  { label: "Mental Health", dot: "#334155", top: "92%",  left: "28%",   anchor: { x: 44, y: 62 }, delay: 0.6 },
  { label: "Childcare",     dot: "#2E8BC0", top: "88%",  left: "-6%",   anchor: { x: 42, y: 60 }, delay: 0.75 },
];

const stats = [
  { value: "1,500+", label: "Residents Connected" },
  { value: "50+",    label: "Partner Organizations" },
  { value: "4,000+", label: "Referrals Made" },
  { value: "100%",   label: "Real-Time Data Access" },
];

export default function ConnectedCommunityHero({
  showNetworkBadge = true,
}: {
  showNetworkBadge?: boolean;
}) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Warm cream→white wash background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFAF3] via-white to-[#F8FAFC]" />
        {/* Soft radial orange accent top-right */}
        <div className="absolute top-10 right-[6%] w-[500px] h-[500px] bg-gradient-radial from-brand-orange/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        {/* Soft blue accent bottom-left */}
        <div className="absolute bottom-0 left-[4%] w-[400px] h-[400px] bg-gradient-radial from-brand-blue/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-site mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* LEFT — copy stack */}
          <div className="md:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-5"
            >
              Community Impact Platform
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="heading-hero text-slate-900 mb-6"
            >
              Connecting Communities to{" "}
              <span className="gradient-text-orange">Critical Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-text text-slate-600 max-w-lg mb-10"
            >
              Impact Works develops data-driven solutions that make it easier for people to find the help they need while strengthening collaboration between organizations that serve the community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/platform" className="btn-primary">
                Explore Linksy <span>&rarr;</span>
              </Link>
              <Link href="/impact" className="btn-outline-light">
                See Community Impact
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — photo + service wires */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 relative"
          >
            {/* Photo canvas */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/community-hero.jpg"
                alt="A diverse group of community members standing together at sunset"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Warm duotone wash — ties photo into brand palette */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/25 via-transparent to-brand-blue/15" />
              {/* Bottom vignette so chips pop */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Service-wire SVG — positioned to cover the photo + chip overhang */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 100 125"
              preserveAspectRatio="none"
              aria-hidden="true"
              role="presentation"
            >
              {chips.map((chip, i) => {
                // chip endpoint in SVG coords (% → matches viewBox numbers)
                // approximate from chip CSS position; SVG uses 100×125 to match 4:5 canvas
                const chipX = chip.right ? 100 - parseFloat(chip.right) : parseFloat(chip.left ?? "0");
                const chipY = parseFloat(chip.top) * 1.25;
                const anchorX = chip.anchor.x;
                const anchorY = chip.anchor.y * 1.25;
                // curved path with a subtle control point
                const midX = (anchorX + chipX) / 2;
                const midY = (anchorY + chipY) / 2 - 3;
                const d = `M ${anchorX} ${anchorY} Q ${midX} ${midY} ${chipX} ${chipY}`;
                return (
                  <g key={`wire-${i}`}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#E8751A"
                      strokeOpacity={0.55}
                      strokeWidth={0.35}
                      strokeDasharray="1.2 1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.0, delay: 0.6 + chip.delay, ease: "easeOut" }}
                    />
                    {/* Traveling pulse dot */}
                    <motion.circle
                      r={0.8}
                      fill={chip.dot}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.9, 0] }}
                      transition={{
                        duration: 4 + i * 0.3,
                        delay: 2 + chip.delay,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <animateMotion
                        dur={`${4 + i * 0.3}s`}
                        begin={`${2 + chip.delay}s`}
                        repeatCount="indefinite"
                        path={d}
                        rotate="auto"
                      />
                    </motion.circle>
                  </g>
                );
              })}

              {/* Glowing anchor points inside the photo */}
              {[{ x: 48, y: 62 * 1.25 }, { x: 55, y: 60 * 1.25 }, { x: 42, y: 61 * 1.25 }].map((p, i) => (
                <motion.circle
                  key={`anchor-${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={0.8}
                  fill="#E8751A"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
                  transition={{
                    opacity: { duration: 2.5, repeat: Infinity, delay: 0.4 + i * 0.2 },
                    scale:   { duration: 0.6, delay: 0.4 + i * 0.2 },
                  }}
                />
              ))}
            </svg>

            {/* Chips */}
            {chips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4 + chip.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  top: chip.top,
                  left: chip.left,
                  right: chip.right,
                }}
                className="absolute hidden md:flex bg-white shadow-md rounded-xl px-3.5 py-2 items-center gap-2 border border-slate-100"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: chip.dot }}
                />
                <span className="font-mono text-[11px] text-slate-700 whitespace-nowrap">
                  {chip.label}
                </span>
              </motion.div>
            ))}

            {/* Live Network badge (optional) */}
            {showNetworkBadge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="hidden md:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-52"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-orange mb-1">
                  Live Network
                </p>
                <p className="font-display text-base font-bold text-slate-900 leading-tight">
                  9 sectors,<br />
                  one coordinated response.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* STATS HORIZON BAND */}
      <section className="relative bg-[#FFF4E0] border-y border-brand-orange/10">
        <div className="max-w-site mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-orange/15 py-6 md:py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 md:px-6 text-center">
              <p className="font-mono text-2xl md:text-4xl text-brand-orange font-bold tabular-nums leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] md:text-sm text-slate-600 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
