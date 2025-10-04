import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import {
  Users,
  Calendar,
  Gift,
  Heart,
  Sparkles,
  Megaphone,
  PenLine,
  Camera,
  Laptop,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Clock4,
  CheckCircle2,
  ChevronRight,
  Handshake,
} from "lucide-react";

/**
 * Volunteer.jsx — Ultra‑Premium, Responsive, Motion‑first Page
 * - Hero with gradient mesh + badges
 * - Why volunteer (benefits grid)
 * - Filterable roles with tags
 * - Impact counters (CountUp, a11y‑friendly)
 * - How it works (4‑step timeline)
 * - Commitments & Perks band
 * - FAQs accordion
 * - CTA with dual actions (Join / WhatsApp)
 *
 * Tailwind + Framer Motion + Lucide only
 */

const ROLES = [
  {
    icon: Megaphone,
    title: "Community Outreach",
    description: "Engage with local communities, run drives, and support our field initiatives.",
    tags: ["On‑ground", "People"],
  },
  {
    icon: Calendar,
    title: "Event Coordination",
    description: "Plan workshops, logistics, guest coordination, and on‑site experience.",
    tags: ["Operations", "On‑ground"],
  },
  {
    icon: PenLine,
    title: "Content & Design",
    description: "Write stories, design creatives, and craft campaigns that inspire action.",
    tags: ["Creative", "Remote"],
  },
  {
    icon: Camera,
    title: "Photo / Video",
    description: "Capture impact on the ground; edits for reels, shorts, and reports.",
    tags: ["Creative", "On‑ground"],
  },
  {
    icon: Laptop,
    title: "Tech & Data",
    description: "No‑code tools, dashboards, websites, and automation for scale.",
    tags: ["Remote", "Technical"],
  },
  {
    icon: Gift,
    title: "Fundraising",
    description: "Partner outreach, CSR connects, campaigns, and donor stewardship.",
    tags: ["Partnerships", "Remote"],
  },
];

const FILTERS = ["All", "On‑ground", "Remote", "Creative", "Operations", "People", "Technical", "Partnerships"];

const STATS = [
  { label: "Active Volunteers", value: 120, icon: Users },
  { label: "Projects Completed", value: 45, icon: Gift },
  { label: "Communities Reached", value: 30, icon: Heart },
];

const BENEFITS = [
  { icon: ShieldCheck, title: "Structured Mentorship", desc: "Guidance from program leads and alumni mentors." },
  { icon: Clock4, title: "Flexible Schedules", desc: "Weekday/weekend tracks and remote options." },
  { icon: CheckCircle2, title: "Certificates & LORs", desc: "Recognized completion, impact letters for top performers." },
  { icon: Handshake, title: "Real‑World Impact", desc: "See your work change lives on the ground." },
];

const FAQS = [
  { q: "Is prior experience required?", a: "No. We welcome starters and pros alike. Orientation and role guides will get you ready." },
  { q: "What is the time commitment?", a: "Typical tracks are 3–5 hrs/week. Event sprints need more time for 1–2 weeks." },
  { q: "Are there remote roles?", a: "Yes—Content, Tech & Data, Partnerships, and Campaigns can be done remotely." },
  { q: "Do I get a certificate?", a: "Yes. Certificates are issued on meeting agreed milestones; LORs are provided for exceptional impact." },
];

export default function Volunteer() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? ROLES : ROLES.filter((r) => r.tags.includes(active))),
    [active]
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-sky-50 text-gray-900">
      {/* floating gradient orbs */}
      <motion.div aria-hidden animate={reduced ? {} : { x: [0, 24, 0], y: [0, -18, 0] }} transition={{ repeat: Infinity, duration: 16 }} className="pointer-events-none absolute -top-28 -left-32 h-[520px] w-[520px] rounded-full bg-emerald-300/25 blur-3xl" />
      <motion.div aria-hidden animate={reduced ? {} : { x: [0, -20, 0], y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 18 }} className="pointer-events-none absolute -bottom-28 -right-32 h-[520px] w-[520px] rounded-full bg-sky-300/25 blur-3xl" />

      {/* HERO */}
      <section className="relative mx-auto grid min-h-[70vh] md:min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[clamp(2rem,6vw,3.75rem)] font-extrabold leading-tight">
            Become a <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Volunteer</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-3 max-w-xl text-[clamp(1rem,1.6vw,1.125rem)] text-gray-700">
            Contribute your skills and passion to projects in education, sustainability, and community upliftment.
          </motion.p>

          {/* hero badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 flex flex-wrap items-center gap-2">
            {["Orientation Included", "Remote Options", "Impact‑First"].map((b) => (
              <span key={b} className="rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur">
                {b}
              </span>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/signup" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg ring-emerald-500/30 transition hover:shadow-xl">
              <Sparkles className="h-5 w-5" /> Join Now
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="rounded-2xl border border-emerald-200 bg-white/80 px-5 py-3 font-semibold text-emerald-700 shadow-sm backdrop-blur transition hover:bg-white">
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* hero card */}
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative rounded-3xl border border-emerald-100/60 bg-white/70 p-6 shadow-2xl backdrop-blur-sm md:p-8">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-700">Volunteer Community</p>
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">Make real‑world impact</p>
          <p className="mt-1 text-gray-600">Structured roles, clear milestones, outcome‑based recognition.</p>

          <div className="mt-6 grid grid-cols-3 gap-3" aria-live="polite">
            {STATS.map((s, i) => (
              <div key={s.label} className="rounded-2xl border border-emerald-100 bg-white/60 p-4 text-center shadow-sm">
                <div className="mx-auto h-6 w-6 text-emerald-700">{React.createElement(s.icon, { className: "h-6 w-6" })}</div>
                <div className="mt-1 text-xl font-extrabold text-emerald-700">
                  <CountUp end={s.value} duration={2} separator="," />+
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-emerald-800/80">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold text-emerald-700">Why Volunteer with Us</h2>
          <p className="mt-2 text-gray-600">Designed to respect your time and maximize your impact.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                {React.createElement(b.icon, { className: "h-6 w-6" })}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{b.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROLES + FILTERS */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold">How You Can Help</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">Pick a track that fits your skills and time. Switch tracks anytime.</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActive(f)} className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition ${active === f ? "border-sky-500 bg-sky-50 text-sky-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((r) => (
              <motion.article key={r.title} layout initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl backdrop-blur">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 text-white shadow">
                    {React.createElement(r.icon, { className: "h-6 w-6" })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{r.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {r.tags.map((t) => (
                        <span key={t} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="/signup" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Apply now <ChevronRight className="h-4 w-4" />
                </a>
                <div className="pointer-events-none absolute -right-10 top-4 h-8 w-32 rotate-12 bg-gradient-to-r from-emerald-200/40 to-sky-200/40 opacity-0 blur group-hover:opacity-100" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sky-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold text-emerald-700">How It Works</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">Simple, transparent process—start this week.</p>
          </div>
          <div className="mt-10 grid items-start gap-6 md:grid-cols-4">
            {[
              { t: "Apply", d: "Fill the quick signup form with your interests.", i: PenLine },
              { t: "Orient", d: "Join a 30‑min orientation and pick your track.", i: Users },
              { t: "Contribute", d: "Complete milestones with your mentor.", i: CheckCircle2 },
              { t: "Celebrate", d: "Showcase outcomes; receive certificate/LOR.", i: Gift },
            ].map((s, idx) => (
              <motion.div key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: idx * 0.05 }} className="relative rounded-3xl border border-emerald-100 bg-white p-6 text-center shadow-xl">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 text-white">
                  {React.createElement(s.i, { className: "h-6 w-6" })}
                </div>
                <h3 className="mt-3 text-base font-semibold text-gray-900">{s.t}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.d}</p>
                {idx < 3 && <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-emerald-400 md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENTS & PERKS */}
      <section className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 py-12 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur">
            <h3 className="text-lg font-semibold">Your Commitment</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-50">
              <li>3–5 hrs/week (varies by track)</li>
              <li>Attend orientation and monthly sync</li>
              <li>Adhere to child‑safety & data policies</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 shadow-lg backdrop-blur">
            <h3 className="text-lg font-semibold">Our Promise</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-emerald-50">
              <li>Clear role guides & mentorship</li>
              <li>Flexible schedules, remote options</li>
              <li>Certificates, LORs for excellence</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold text-emerald-700">FAQs</h2>
        <div className="mx-auto mt-8 divide-y divide-emerald-100 overflow-hidden rounded-2xl border border-emerald-100 bg-white/70 shadow-xl backdrop-blur">
          {FAQS.map((f, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-medium text-gray-900 transition hover:bg-emerald-50/50">
                <span>{f.q}</span>
                <span className="ml-4 grid h-6 w-6 place-items-center rounded-md border border-emerald-200 text-emerald-700 transition group-open:rotate-45">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-sky-600 py-20 text-white">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-[clamp(1.75rem,3.8vw,2.75rem)] font-extrabold">Ready to make a difference?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-emerald-50">Join our volunteer program today and contribute to meaningful projects that change lives.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="/signup" className="rounded-2xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl">Join Now</a>
            <a href="mailto:info@kalvikann.org" className="rounded-2xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20">Email Us</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}