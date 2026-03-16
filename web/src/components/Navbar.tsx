"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About Us", href: "/about" },
  { name: "Retreats", href: "/retreats" },
  { name: "Co-Living", href: "/co-living" },
  { name: "Community", href: "/community" },
  { name: "Say Hi", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
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
            Say Hi ✦
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-8 pb-6 flex flex-col gap-5 border-t border-white/10 pt-4 mx-4 rounded-b-2xl bg-white/10 backdrop-blur-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
