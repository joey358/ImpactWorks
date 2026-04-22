import Link from "next/link";

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="sticky top-0 z-50 bg-slate-900 text-white text-xs px-4 py-2 flex items-center justify-between font-mono">
        <span className="text-brand-orange font-bold">PREVIEW MODE</span>
        <div className="flex gap-4">
          <Link href="/preview" className="hover:text-brand-orange">Index</Link>
          <Link href="/preview/warm" className="hover:text-brand-orange">V1 · Warm</Link>
          <Link href="/preview/split" className="hover:text-brand-orange">V2 · Split</Link>
          <Link href="/preview/sunlight" className="hover:text-brand-orange">V3 · Sunlight</Link>
          <Link href="/preview/connected" className="hover:text-brand-orange font-bold">V4 · Connected ★</Link>
          <Link href="/" className="hover:text-brand-orange">← Live</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
