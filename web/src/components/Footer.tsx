"use client";

import Link from "next/link";
import { Instagram, Send } from "lucide-react";
import { useState } from "react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Retreats", href: "/retreats" },
      { name: "Co-Living", href: "/co-living" },
      { name: "Say Hi", href: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Join the Waitlist", href: "#" },
      { name: "Member Stories", href: "#" },
      { name: "Co-create With Us", href: "#" },
      { name: "Events", href: "#" },
    ],
  },
];

const socialLinks = [
  { Icon: Instagram, href: "https://www.instagram.com/co_llab__/", label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-32 pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="space-y-5 lg:col-span-1">
            <span className="text-3xl font-black gradient-text block">Co-llab</span>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Reimagining how we live, create, and grow together. A global community for conscious souls.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/50 hover:text-[#EB8064] hover:border-[#EB8064]/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Stay Connected</h3>
            <p className="text-white/50 text-sm">Get retreat updates, community stories, and co-living drops.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#EB8064]/50 transition-colors border border-white/0 focus:border focus:border-[#EB8064]/40 bg-white/5"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EB8064] to-[#D16678] flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg shadow-[#EB8064]/20 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom line */}
        <div className="line-glow mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs">
          <span>© {new Date().getFullYear()} Co-llab. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
