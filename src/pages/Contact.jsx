import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Linkedin,
  Youtube,
  Facebook,
  Twitter,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

/**
 * Premium Contact.jsx (No Form)
 * - Hero with gradient mesh & motion-aware blobs
 * - Quick Actions (Call / Email / WhatsApp) with copy-to-clipboard
 * - Office & Hours cards with deep links to Maps
 * - Social Media grid (brand tiles) + hover micro-interactions
 * - Embedded map (lazy, reduced-motion friendly)
 * - Press & Media kit links
 * - A11y: focus states, semantic landmarks, aria labels
 */

const CONTACT = {
  email: "info@kalvikann.org",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  address: "123, Education Lane, Chennai, India",
  mapsQuery: "Kalvikann Foundation, Chennai",
};

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/santhoshkumar-m1/", icon: Linkedin, color: "from-sky-600 to-blue-600" },
  { label: "Instagram", href: "https://instagram.com/", icon: Instagram, color: "from-pink-500 to-rose-500" },
  { label: "YouTube", href: "https://youtube.com/", icon: Youtube, color: "from-red-600 to-orange-600" },
  { label: "Facebook", href: "https://facebook.com/", icon: Facebook, color: "from-blue-600 to-indigo-700" },
  { label: "X (Twitter)", href: "https://twitter.com/", icon: Twitter, color: "from-gray-800 to-gray-900" },
];

export default function Contact() {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState("");

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(""), 1200);
    } catch {}
  };

  const orbAnimA = reduced ? {} : { x: [0, 35, 0], y: [0, -25, 0] };
  const orbAnimB = reduced ? {} : { x: [0, -30, 0], y: [0, 30, 0] };

  const card = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  };

  const openMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CONTACT.mapsQuery
  )}`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-emerald-50">
      {/* Background Orbs / Mesh */}
      <motion.div
        aria-hidden
        animate={orbAnimA}
        transition={{ repeat: Infinity, duration: 14 }}
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-blue-300/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={orbAnimB}
        transition={{ repeat: Infinity, duration: 18 }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-[520px] w-[520px] rounded-full bg-emerald-300/30 blur-3xl"
      />

      {/* Hero */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-12 text-center md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-gray-900"
        >
          Contact & Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mx-auto mt-3 max-w-2xl text-[clamp(1rem,1.6vw,1.125rem)] text-gray-700"
        >
          We’re here to collaborate, partner, and support. Reach us instantly via phone, email, WhatsApp, or socials.
        </motion.p>
      </header>

      {/* Quick Actions */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Call */}
          <motion.a
            {...card}
            href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
            className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow backdrop-blur transition hover:shadow-lg"
          >
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700"><Phone className="h-5 w-5" aria-hidden /></div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Call Us</div>
              <div className="text-sm text-gray-600">{CONTACT.phone}</div>
            </div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); copy(CONTACT.phone, "phone"); }}
              className="ml-auto inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              aria-label="Copy phone"
            >
              {copied === "phone" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied === "phone" ? "Copied" : "Copy"}
            </button>
          </motion.a>

          {/* Email */}
          <motion.a
            {...card}
            href={`mailto:${CONTACT.email}`}
            className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow backdrop-blur transition hover:shadow-lg"
          >
            <div className="rounded-xl bg-sky-50 p-3 text-sky-700"><Mail className="h-5 w-5" aria-hidden /></div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Email Us</div>
              <div className="text-sm text-gray-600">{CONTACT.email}</div>
            </div>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); copy(CONTACT.email, "email"); }}
              className="ml-auto inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              aria-label="Copy email"
            >
              {copied === "email" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied === "email" ? "Copied" : "Copy"}
            </button>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            {...card}
            href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow backdrop-blur transition hover:shadow-lg"
          >
            <div className="rounded-xl bg-green-50 p-3 text-green-700"><MessageCircle className="h-5 w-5" aria-hidden /></div>
            <div>
              <div className="text-sm font-semibold text-gray-900">WhatsApp</div>
              <div className="text-sm text-gray-600">Chat with our team</div>
            </div>
            <ExternalLink className="ml-auto h-4 w-4 text-gray-500" aria-hidden />
          </motion.a>
        </div>
      </section>

      {/* Offices / Hours */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div {...card} className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-2xl backdrop-blur">
            <div className="mb-3 flex items-center gap-2 text-gray-900">
              <MapPin className="h-5 w-5 text-rose-500" aria-hidden />
              <h3 className="text-base font-semibold">Primary Office</h3>
            </div>
            <p className="text-sm text-gray-700">{CONTACT.address}</p>
            <a href={openMapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow hover:bg-gray-50">
              Open in Maps <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-1 inline-flex items-center gap-2 font-semibold text-gray-900"><Clock className="h-4 w-4 text-emerald-600" aria-hidden />Hours</div>
                <p className="text-gray-600">Mon–Fri: 9:30 AM–6:00 PM<br/>Sat: 10:00 AM–2:00 PM</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="mb-1 inline-flex items-center gap-2 font-semibold text-gray-900"><Phone className="h-4 w-4 text-emerald-600" aria-hidden />Hotline</div>
                <p className="text-gray-600">{CONTACT.phone}</p>
              </div>
            </div>
          </motion.div>

          {/* Live Map (lazy) */}
          <motion.div {...card} className="overflow-hidden rounded-3xl border border-gray-200 shadow-2xl">
            <iframe
              title="Kalvikann Foundation on Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full md:h-full"
              src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyD-PLACEHOLDER&zoom=12&q=${encodeURIComponent(
                CONTACT.mapsQuery
              )}`}
            />
          </motion.div>
        </div>
      </section>

      {/* Socials */}
      <section aria-labelledby="socials-heading" className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <h2 id="socials-heading" className="text-center text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold text-emerald-700">Follow Our Work</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">Real-time updates, field stories, and program wins across our social channels.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white/80 p-5 shadow backdrop-blur transition hover:shadow-xl`}
            >
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white`}>
                {React.createElement(s.icon, { className: "h-5 w-5", "aria-hidden": true })}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{s.label}</div>
                <div className="text-xs text-gray-500">Tap to open</div>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 text-gray-500 transition group-hover:translate-x-0.5" aria-hidden />
            </a>
          ))}
        </div>
      </section>

      {/* Media / Press */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-extrabold text-gray-900">Press & Media</h3>
              <p className="mt-1 text-sm text-gray-700">For interviews, quotes, and story permissions—email our media desk. Our logo kit and brand guide are available below.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="mailto:media@kalvikann.org" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-lg">media@kalvikann.org <ExternalLink className="h-4 w-4" aria-hidden /></a>
                <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">Download Media Kit <ExternalLink className="h-4 w-4" aria-hidden /></a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-semibold text-gray-900">Registered Office</div>
                <p className="mt-1 text-gray-600">{CONTACT.address}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-semibold text-gray-900">Mailing Address</div>
                <p className="mt-1 text-gray-600">PO Box 42, Chennai 600001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 p-8 text-white shadow-2xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-extrabold">Let’s build impact together</h3>
              <p className="mt-1 max-w-xl text-emerald-50">Partner with us on education, sustainability and health initiatives. Your collaboration accelerates our mission.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${CONTACT.email}`} className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl">Email Us</a>
              <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">Call Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* CSS notes (add to your globals if not present)
.animate-bob { animation: bob 8s ease-in-out infinite; }
.animate-bob-slow { animation: bob 12s ease-in-out infinite; }
.animate-bob-slower { animation: bob 18s ease-in-out infinite; }
@keyframes bob { 0% { transform: translateY(0) } 50% { transform: translateY(-6px) } 100% { transform: translateY(0) } }
*/