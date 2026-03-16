"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Instagram, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="px-6 py-20 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-16 pt-10">
        {/* Header */}
        <section className="text-center space-y-5">
          <span className="text-xs uppercase tracking-[0.3em] text-[#EB8064] font-semibold">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none">
            Say <span className="gradient-text">Hi.</span>
          </h1>
          <p className="text-white/50 text-xl max-w-xl mx-auto">
            Questions, partnerships, retreat ideas, or just vibes — we're here.
          </p>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Info */}
          <div className="glass rounded-3xl p-10 space-y-10 border border-white/10">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white">We'd love to hear from you.</h2>
              <p className="text-white/50 leading-relaxed">
                Whether you're curious about a retreat, want to co-create with us, or just want to say hello — reach out. We respond to every message.
              </p>
            </div>
            <div className="space-y-5">
              <a href="mailto:hello@co-llab.community" className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10 group-hover:border-[#EB8064]/40 transition-colors">
                  <Mail className="w-4 h-4 text-[#EB8064]" />
                </div>
                hello@co-llab.community
              </a>
              <div className="flex items-start gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#D16678]" />
                </div>
                <div>
                  <div className="text-white font-medium">Global HQ</div>
                  <div className="text-sm">Lisbon, Portugal</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Follow us</p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-[#EB8064] hover:border-[#EB8064]/30 border border-white/10 transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass rounded-3xl p-10 border border-white/10">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-5xl">✦</div>
                <h3 className="text-2xl font-black text-white">Message sent!</h3>
                <p className="text-white/50">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-[#EB8064] text-sm hover:underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "first", label: "First Name", placeholder: "Jane" },
                    { id: "last", label: "Last Name", placeholder: "Doe" },
                  ].map((f) => (
                    <div key={f.id} className="space-y-2">
                      <label htmlFor={f.id} className="text-xs font-medium text-white/50 uppercase tracking-wider">{f.label}</label>
                      <input
                        type="text"
                        id={f.id}
                        placeholder={f.placeholder}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-medium text-white/50 uppercase tracking-wider">Email</label>
                  <input type="email" id="email" required placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-xs font-medium text-white/50 uppercase tracking-wider">Topic</label>
                  <select id="topic"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white/80 text-sm focus:outline-none focus:border-white/50 transition-colors">
                    <option value="">Select a topic...</option>
                    <option value="retreat">Retreat Inquiry</option>
                    <option value="coliving">Co-Living Inquiry</option>
                    <option value="partnership">Partnership / Collab</option>
                    <option value="other">Just saying hi 👋</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium text-white/50 uppercase tracking-wider">Message</label>
                  <textarea id="message" rows={4} required placeholder="Tell us what's on your mind..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#EB8064]/50 transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#EB8064] to-[#D16678] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-[#EB8064]/20 flex items-center justify-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
