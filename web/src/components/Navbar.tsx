"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About Us", href: "/about" },
  { name: "Immersions", href: "/retreats" },
  { name: "Coliving", href: "/coliving" },
  { name: "Creators' Lab", href: "/creators-club" },
  { name: "1:1", href: "/one-to-one" },
  { name: "Get Involved", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center relative z-[60]" onClick={() => setOpen(false)}>
          <span className="text-2xl font-black tracking-tight text-white">
            Co-llab<span className="text-[#EB8064]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-200 hover:text-white relative group ${
                pathname === item.href ? "text-white" : "text-white/70"
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                  pathname === item.href ? "w-full opacity-60" : "w-0 group-hover:w-full opacity-40"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full text-sm font-semibold text-white border border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          >
            Get Involved ✦
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col mobile-bar-surface">
          <div className="h-[72px] shrink-0" aria-hidden />
          <nav className="flex-1 overflow-y-auto px-6 pb-10 pt-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-4 text-lg font-semibold transition-colors ${
                  pathname === item.href
                    ? "bg-white/15 text-white"
                    : "text-white/80 active:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/rates"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] shadow-lg shadow-[#EB8064]/25"
            >
              See Rates &amp; Book ✦
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white border border-white/25 bg-white/10"
            >
              Get Involved
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
