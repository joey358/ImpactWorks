"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HomeLightSections from "@/components/HomeLightSections";
import HeroNetworkSVG from "@/components/HeroNetworkSVG";

export default function SplitPreview() {
  return (
    <div>
      {/* V2 HERO — Editorial split: copy left, photo card right */}
      <section className="relative bg-white overflow-hidden">
        {/* Soft cream wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDFAF3] via-white to-[#F8FAFC]" />
        {/* Radial orange accent */}
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-gradient-radial from-brand-orange/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-site mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
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
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="body-text text-slate-600 max-w-lg mb-10">
              Impact Works develops data-driven solutions that make it easier for people to find the help they need while strengthening collaboration between organizations that serve the community.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap gap-4 mb-10">
              <Link href="/platform" className="btn-primary">Explore Linksy <span>&rarr;</span></Link>
              <Link href="/impact" className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 font-display font-semibold px-8 py-4 rounded-xl hover:border-brand-orange hover:text-brand-orange transition-all">
                See Community Impact
              </Link>
            </motion.div>

            {/* Inline proof-point strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-orange rounded-full" /> 1,500+ residents connected</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-blue rounded-full" /> 50+ partners</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-brand-green rounded-full" /> Real-time referrals</div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/community-hero.jpg"
                alt="Community together"
                fill
                priority
                className="object-cover object-center"
              />
              {/* Warm overlay to tie into brand */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/15 via-transparent to-transparent" />
            </div>

            {/* Floating network badge — bottom-left over photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 w-48 hidden md:block"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-1">Live Network</p>
              <p className="font-display text-lg font-bold text-slate-800">9 sectors,</p>
              <p className="text-xs text-slate-500">one coordinated response.</p>
              <div className="mt-3 h-12 overflow-hidden opacity-90">
                <HeroNetworkSVG />
              </div>
            </motion.div>

            {/* Floating stat card — top-right */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 hidden md:block"
            >
              <p className="font-mono text-3xl font-bold text-brand-orange tabular-nums">4,000+</p>
              <p className="text-xs text-slate-500">referrals made</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <HomeLightSections statsBackground="blue-tint" />
    </div>
  );
}
