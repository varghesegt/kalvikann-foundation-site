import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import {
  Users,
  BookOpen,
  Heart,
  Lightbulb,
  Target,
  CheckCircle2,
  Leaf,
  Globe2,
  Sparkles,
  Quote,
  ShieldCheck,
} from "lucide-react";

/**
 * Ultra‑Responsive Premium About Page — Kalvikann Foundation
 * Enhancements:
 *  - Responsive typography with clamp()
 *  - Container queries via max-w and fluid spacing
 *  - Motion respect for prefers-reduced-motion
 *  - Accessible landmarks & keyboard focus rings
 *  - Image performance: lazy loading + intrinsic aspect ratios
 *  - Fine‑tuned grid breakpoints (xs/sm/md/lg/xl/2xl)
 */

const stats = [
  { number: 10000, suffix: "+", label: "Lives Impacted" },
  { number: 250, suffix: "+", label: "Volunteers" },
  { number: 50, suffix: "+", label: "Programs Completed" },
  { number: 30, suffix: "+", label: "Communities Reached" },
];

const programs = [
  {
    title: "Community Learning Pods",
    desc: "After‑school support, mentorship and digital literacy for underserved students.",
    icon: <BookOpen className="w-6 h-6" aria-hidden />,
    tag: "Education",
  },
  {
    title: "Eco‑Stewardship",
    desc: "Tree plantations, waste segregation drives, water conservation workshops.",
    icon: <Leaf className="w-6 h-6" aria-hidden />,
    tag: "Sustainability",
  },
  {
    title: "Health & Hygiene",
    desc: "Awareness camps, menstrual health kits, sanitation infrastructure guidance.",
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    tag: "Wellbeing",
  },
];

const values = [
  { icon: <Users className="w-6 h-6" aria-hidden />, title: "Community‑first", desc: "Co‑create with local leaders for lasting change." },
  { icon: <Heart className="w-6 h-6" aria-hidden />, title: "Compassion", desc: "Lead with empathy, serve with dignity." },
  { icon: <Lightbulb className="w-6 h-6" aria-hidden />, title: "Innovation", desc: "Solve with creativity, measure what matters." },
];

const journey = [
  { year: "2019", text: "Founded with a vision to democratize learning." },
  { year: "2020", text: "First community learning pods launched across clusters." },
  { year: "2022", text: "Scaled sustainability & health interventions statewide." },
  { year: "2024", text: "Crossed 10,000+ lives impacted with partner support." },
];

const stories = [
  {
    quote: "Before the pod, my daughter struggled with basics. Now she teaches her friends!",
    name: "Lakshmi",
    role: "Parent, Tiruppur",
  },
  {
    quote: "Volunteering here changed my idea of impact—small, consistent steps work magic.",
    name: "Rahul",
    role: "Volunteer Mentor",
  },
];

const logos = [
  "images/partner-1.png",
  "images/partner-2.png",
  "images/partner-3.png",
  "images/partner-4.png",
];

export default function About() {
  const reduceMotion = useReducedMotion();

  const floatY = reduceMotion ? {} : { y: [0, 40, 0] };
  const floatX = reduceMotion ? {} : { x: [0, 60, 0] };

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50 to-blue-50">
      {/* Parallax orbs (respect reduced motion) */}
      <motion.div
        aria-hidden
        animate={floatY}
        transition={{ repeat: Infinity, duration: 12 }}
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-emerald-300/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={floatX}
        transition={{ repeat: Infinity, duration: 14 }}
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-sky-300/30 blur-3xl"
      />

      {/* HERO */}
      <section aria-labelledby="about-hero-heading" className="relative mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:min-h-[80vh] md:grid-cols-2 md:py-20 lg:px-8">
        <div>
          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-extrabold leading-[1.1] text-gray-900 text-[clamp(2rem,4.5vw,3.75rem)]"
          >
            Together, we turn <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">learning</span> into
            <span className="ml-2 bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">lasting change</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-4 max-w-xl text-base text-gray-700 sm:text-lg"
          >
            Kalvikann Foundation empowers communities through education, sustainability and health initiatives—built with compassion, run with accountability.
          </motion.p>

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3"
            aria-label="Trust badges"
          >
            {["12A/80G Compliant", "Volunteer‑led", "Impact Audited"].map((b) => (
              <li key={b} className="rounded-full border border-emerald-200/70 bg-white/60 px-3 py-1.5 text-xs text-emerald-700 shadow-sm backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                {b}
              </li>
            ))}
          </motion.ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#programs"
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg ring-emerald-500/30 transition hover:shadow-xl focus:outline-none focus-visible:ring sm:text-base"
            >
              <Sparkles className="h-5 w-5 transition group-hover:rotate-6" aria-hidden /> Explore Programs
            </a>
            <a
              href="#impact"
              className="inline-flex items-center justify-center rounded-2xl border border-emerald-200 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring sm:text-base"
            >
              View Impact
            </a>
          </div>
        </div>

        {/* Hero card */}
        <motion.aside
          aria-label="Impact snapshot"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="relative rounded-3xl border border-emerald-100/60 bg-white/70 p-5 shadow-2xl backdrop-blur-sm sm:p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <Globe2 className="h-6 w-6 text-emerald-600" aria-hidden />
            <p className="text-sm font-medium text-emerald-700">Kalvikann Foundation</p>
          </div>
          <p className="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
            Education × Sustainability × Health
          </p>
          <p className="mt-2 text-gray-600">
            A holistic model designed with communities, not just for them.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4" id="impact">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-emerald-100 bg-white/60 p-3 text-center shadow-sm sm:p-4">
                <div className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-emerald-700">
                  <CountUp end={s.number} duration={2.2} separator="," />
                  {s.suffix}
                </div>
                <p className="mt-1 text-[11px] font-medium text-emerald-800/80 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      {/* WHAT WE DO (Programs) */}
      <section id="programs" aria-labelledby="programs-heading" className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="programs-heading" className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold text-emerald-700">What We Do</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Practical, measurable programs that meet communities where they are.
          </p>
        </div>
        <div className="mt-8 grid gap-4 xs:grid-cols-2 md:mt-10 md:grid-cols-3 md:gap-6">
          {programs.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/70 p-5 shadow-xl backdrop-blur-sm sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 sm:px-3 sm:text-xs">
                  {p.icon}
                  {p.tag}
                </span>
                <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 opacity-20 transition group-hover:opacity-40 sm:h-10 sm:w-10" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-gray-900 sm:mt-4 sm:text-lg">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">{p.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                Learn more <span className="transition group-hover:translate-x-0.5">→</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section aria-labelledby="mv-heading" className="bg-gradient-to-r from-emerald-50 to-sky-50 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-8 lg:px-8">
          {[
            {
              icon: <Target className="h-12 w-12 text-emerald-600 sm:h-14 sm:w-14" aria-hidden />,
              title: "Our Mission",
              desc: "Empower under‑resourced communities with access to education, eco‑awareness and health support—built for long‑term resilience.",
            },
            {
              icon: <Lightbulb className="h-12 w-12 text-sky-600 sm:h-14 sm:w-14" aria-hidden />,
              title: "Our Vision",
              desc: "A world where opportunity is equitable and every learner becomes a steward of people and planet.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-xl backdrop-blur sm:p-8"
            >
              {item.icon}
              <h3 className="mt-3 text-xl font-semibold text-gray-900 sm:mt-4 sm:text-2xl">{item.title}</h3>
              <p className="mt-1 text-gray-600 sm:text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section aria-labelledby="values-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        <h2 id="values-heading" className="text-center text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-700">Our Core Values</h2>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:grid-cols-3 md:gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-emerald-100 bg-white/70 p-6 text-center shadow-xl backdrop-blur sm:p-8"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                {v.icon}
              </div>
              <h3 className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg">{v.title}</h3>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 py-12 text-white md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-4 md:gap-6 lg:px-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: reduceMotion ? 1 : 1.05 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white/10 p-5 text-center shadow-lg backdrop-blur sm:p-6"
            >
              <div className="text-[clamp(1.75rem,3.2vw,2.25rem)] font-extrabold">
                <CountUp end={s.number} duration={2} separator="," />
                {s.suffix}
              </div>
              <p className="mt-1 text-emerald-50 text-xs sm:text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section aria-labelledby="journey-heading" className="bg-sky-50 py-12 md:py-16">
        <h2 id="journey-heading" className="text-center text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-700">Our Journey</h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-8 px-4 sm:px-6 md:mt-12">
          {journey.map((j, i) => (
            <motion.div
              key={j.year}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex items-start gap-4 ${i % 2 ? "flex-row-reverse text-right" : ""}`}
            >
              <CheckCircle2 className="mt-0.5 h-7 w-7 flex-shrink-0 text-emerald-600" aria-hidden />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 sm:text-xl">{j.year}</h4>
                <p className="text-sm text-gray-600 sm:text-base">{j.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT STORIES */}
      <section aria-labelledby="stories-heading" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="stories-heading" className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-700">Impact Stories</h2>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">Real voices from families and volunteers we serve with.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          {stories.map((s, i) => (
            <motion.figure
              key={s.name + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-xl backdrop-blur sm:p-8"
            >
              <Quote className="absolute -left-3 -top-3 h-10 w-10 text-emerald-200 sm:h-12 sm:w-12" aria-hidden />
              <blockquote className="text-sm text-gray-700 sm:text-base">“{s.quote}”</blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-emerald-700 sm:mt-4 sm:text-sm">
                {s.name} • <span className="font-normal text-gray-600">{s.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* PARTNERS LOGO CLOUD */}
      <section aria-labelledby="partners-heading" className="bg-white/70 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p id="partners-heading" className="text-center text-xs font-semibold uppercase tracking-wider text-emerald-700 sm:text-sm">Supported by</p>
          <ul className="mt-4 grid grid-cols-2 place-items-center gap-4 sm:mt-6 sm:grid-cols-4 sm:gap-6">
            {logos.map((src, i) => (
              <li key={i} className="flex items-center justify-center">
                <img
                  src={src}
                  srcSet={`${src} 1x`}
                  loading="lazy"
                  width="160"
                  height="40"
                  alt={`Partner ${i + 1}`}
                  className="h-8 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-10"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <h2 id="faq-heading" className="text-center text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-emerald-700">FAQs</h2>
        <div className="mx-auto mt-6 divide-y divide-emerald-100 overflow-hidden rounded-2xl border border-emerald-100 bg-white/70 shadow-xl backdrop-blur sm:mt-8">
          {[
            { q: "How can I volunteer?", a: "Sign up on our Volunteers page—after an orientation, we match you with a nearby program." },
            { q: "Are donations tax‑exempt?", a: "Yes. We are 12A/80G compliant. Receipts are emailed automatically for each contribution." },
            { q: "Can organizations partner with you?", a: "Absolutely. CSR and institutional partnerships help us scale—reach out via our Partnerships form." },
          ].map((f, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-sm font-medium text-gray-900 transition hover:bg-emerald-50/50 focus:outline-none focus-visible:ring sm:px-6 sm:text-base">
                <span>{f.q}</span>
                <span className="ml-4 inline-grid h-6 w-6 place-items-center rounded-md border border-emerald-200 text-emerald-700 transition group-open:rotate-45">+</span>
              </summary>
              <div className="px-4 pb-5 text-sm text-gray-600 sm:px-6 sm:text-base">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-sky-600 py-14 text-white md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 id="cta-heading" className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold">Join Us in Making a Difference</h2>
          <p className="mx-auto mt-3 max-w-2xl text-emerald-50 text-sm sm:text-base">
            Volunteer, partner or contribute—help us transform lives and build greener communities.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
            <a href="#" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:translate-y-[-2px] sm:text-base">
              🌿 Get Involved
            </a>
            <a href="#" className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20 sm:text-base">
              Become a Partner
            </a>
          </div>
        </motion.div>
        <motion.div
          aria-hidden
          animate={floatX}
          transition={{ repeat: Infinity, duration: 18 }}
          className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
      </section>
    </main>
  );
}
