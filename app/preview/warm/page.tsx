"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import HomeLightSections from "@/components/HomeLightSections";

export default function WarmPreview() {
  return (
    <div>
      {/* V1 HERO — Full-bleed community photo, cream gradient overlay from left */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FAF6EE]">
        {/* Photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/community-hero.jpg"
            alt="Community together at golden hour"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Cream-to-transparent gradient so text side stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE]/95 via-[#FAF6EE]/70 to-transparent" />
          {/* Bottom soft fade into next section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Soft orange radial accent top right */}
        <div className="absolute top-20 right-[8%] w-[400px] h-[400px] bg-gradient-radial from-brand-orange/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-site mx-auto px-6 py-28 md:py-36 w-full">
          <div className="max-w-2xl">
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
              <Link href="/impact" className="inline-flex items-center gap-2 border border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 font-display font-semibold px-8 py-4 rounded-xl hover:border-brand-orange hover:text-brand-orange transition-all">
                See Community Impact
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <HomeLightSections statsBackground="ivory" />
    </div>
  );
}
