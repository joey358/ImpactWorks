"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HomeLightSections from "@/components/HomeLightSections";
import HeroNetworkSVG from "@/components/HeroNetworkSVG";

function SunlightArcs() {
  const arcs = [
    { color: "#E8751A", rx: 320, ry: 300, rotation: -20, delay: 0 },
    { color: "#F5A623", rx: 280, ry: 260, rotation: 15, delay: 0.3 },
    { color: "#2E8BC0", rx: 240, ry: 220, rotation: 40, delay: 0.6 },
    { color: "#3DAA5C", rx: 350, ry: 320, rotation: -40, delay: 0.9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 800 600" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-40" xmlns="http://www.w3.org/2000/svg">
        {arcs.map((arc, i) => (
          <motion.ellipse
            key={i}
            cx="400"
            cy="300"
            rx={arc.rx}
            ry={arc.ry}
            fill="none"
            stroke={arc.color}
            strokeWidth="1.5"
            strokeDasharray="100 400"
            initial={{ rotate: arc.rotation, opacity: 0 }}
            animate={{ rotate: arc.rotation + 360, opacity: 0.7 }}
            transition={{
              rotate: { duration: 45 + i * 5, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1.5, delay: arc.delay },
            }}
            style={{ transformOrigin: "400px 300px" }}
          />
        ))}
        {/* Sun center */}
        <circle cx="400" cy="300" r="6" fill="#F5A623" opacity="0.8">
          <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

export default function SunlightPreview() {
  return (
    <div>
      {/* V3 HERO — Sunlight gradient, no photo, warmed abstract graphic */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Sunrise gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF4E0] via-[#FFE9C8] to-[#FFD9A8]" />
        {/* Horizon glow */}
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-radial from-[#FFC58A]/60 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-brand-orange/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <SunlightArcs />

        {/* Fade to white at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-site mx-auto px-6 py-28 md:py-36 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow mb-5">
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
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="body-text text-slate-700 max-w-lg mb-10">
              Impact Works develops data-driven solutions that make it easier for people to find the help they need while strengthening collaboration between organizations that serve the community.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-4">
              <Link href="/platform" className="btn-primary">Explore Linksy <span>&rarr;</span></Link>
              <Link href="/impact" className="inline-flex items-center gap-2 border border-slate-400/60 text-slate-800 font-display font-semibold px-8 py-4 rounded-xl hover:border-brand-orange hover:text-brand-orange transition-all">
                See Community Impact
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <HeroNetworkSVG />
          </motion.div>
        </div>
      </section>

      <HomeLightSections statsBackground="cream" />
    </div>
  );
}
