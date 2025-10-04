// src/pages/Founder.jsx
import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import {
  Award,
  BookOpen,
  Heart,
  Target,
  Quote,
  Linkedin,
  Mail,
  CheckCircle2,
  Star,
  Feather,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";

const STATS = [
  { id: "impacted", value: 10000, label: "Lives Impacted", suffix: "+", icon: Users },
  { id: "vols", value: 250, label: "Volunteers", suffix: "+", icon: Heart },
  { id: "programs", value: 50, label: "Programs Completed", suffix: "+", icon: BookOpen },
  { id: "communities", value: 30, label: "Communities Reached", suffix: "+", icon: ShieldCheck },
];

const ACHIEVEMENTS = [
  { title: "National Education Award", subtitle: "Recognized for community learning initiatives", icon: Award, year: "2021" },
  { title: "Sustainable Impact", subtitle: "Model pilot for green classrooms", icon: Star, year: "2023" },
  { title: "Skill Development Drive", subtitle: "10+ vocational cohorts trained", icon: CheckCircle2, year: "2022" },
];

const TIMELINE = [
  { year: "2015", text: "Started grassroots education initiatives focusing on rural students." },
  { year: "2018", text: "Expanded into skill development and community empowerment." },
  { year: "2022", text: "Established Kalvikann Foundation to scale the mission." },
  { year: "2024", text: "Impacting thousands through education & awareness programs." },
];

export default function Founder() {
  const [noteOpen, setNoteOpen] = useState(false);
  const reduced = useReducedMotion();

  const cardV = { hidden: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0 } };
  const stagger = { hidden: {}, enter: { transition: { staggerChildren: 0.1 } } };

  return (
    <div className="relative bg-gradient-to-br from-white via-emerald-50 to-sky-50 text-gray-900">
      {/* Mesh orbs (hidden on tiny screens for perf) */}
      <motion.div
        aria-hidden
        animate={reduced ? {} : { x: [0, 24, 0], y: [0, -22, 0] }}
        transition={{ repeat: Infinity, duration: 16 }}
        className="pointer-events-none absolute -top-24 -left-24 hidden h-[520px] w-[520px] rounded-full bg-emerald-300/25 blur-3xl sm:block"
      />
      <motion.div
        aria-hidden
        animate={reduced ? {} : { x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        className="pointer-events-none absolute -bottom-24 -right-24 hidden h-[560px] w-[560px] rounded-full bg-sky-300/25 blur-3xl sm:block"
      />

      {/* HERO */}
      <header className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 pt-16 pb-8 sm:px-6 md:grid-cols-[1.15fr_1fr] md:gap-10 md:pt-24 md:pb-10">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur sm:text-xs">
              <Sparkles className="h-4 w-4 text-yellow-500" /> Founder & Mission
            </div>

            <h1 className="mt-3 text-[clamp(1.75rem,6vw,3.5rem)] font-extrabold leading-[1.1]">
              Meet the Founder —{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                Santhosh Kumar M
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-[clamp(0.98rem,3.5vw,1.125rem)] text-gray-700">
              Visionary leader behind <strong>Kalvikann Foundation</strong>, driving education, skill development,
              and sustainable initiatives across communities.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://www.linkedin.com/in/santhoshkumar-m1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>

              <button
                onClick={() => setNoteOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50 sm:w-auto"
              >
                <Feather className="h-4 w-4" /> Founder’s Note
              </button>

              <a
                href="mailto:contact@kalvikann.org"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 sm:w-auto"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="relative rounded-2xl border border-emerald-100/60 bg-white/80 p-2 shadow-xl backdrop-blur sm:rounded-3xl sm:p-3 sm:shadow-2xl"
          >
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                src="/images/founder.png"
                alt="Santhosh Kumar M — Founder"
                className="h-56 w-full rounded-xl object-cover transition duration-700 sm:h-72 md:h-80"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="p-4 sm:p-5">
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Santhosh Kumar M</h3>
              <p className="text-xs text-gray-600 sm:text-sm">Founder — Kalvikann Foundation</p>
              <p className="mt-3 text-[13.5px] text-gray-700 sm:text-sm">
                Entrepreneur • Community Developer • EdTech enthusiast. Dedicated to transforming rural education with
                sustainable programs.
              </p>
            </figcaption>
          </motion.figure>
        </div>
      </header>

      {/* STATS BAND */}
      <section className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 py-8 text-white sm:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:gap-4 sm:px-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="rounded-xl bg-white/10 p-4 text-center shadow-lg backdrop-blur sm:rounded-2xl sm:p-6"
              >
                <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-lg bg-white/15 sm:h-10 sm:w-10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-extrabold sm:text-4xl">
                  <CountUp end={s.value} duration={1.8} separator="," />
                  {s.suffix}
                </div>
                <p className="mt-0.5 text-[12.5px] text-emerald-50 sm:mt-1 sm:text-sm">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ACHIEVEMENTS */}
        <section className="py-10 sm:py-12">
          <h2 className="text-[clamp(1.25rem,3.2vw,2rem)] font-bold">Achievements</h2>

          {/* mobile: horizontal snap with edge fade hint */}
          <div className="relative mt-5 grid gap-4 sm:hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-emerald-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-emerald-50 to-transparent" />
            <div className="flex snap-x snap-mandatory overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ACHIEVEMENTS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mr-4 w-[85%] snap-center shrink-0 rounded-2xl border border-emerald-100 bg-white p-5 shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold">{a.title}</h3>
                        <p className="text-[13px] text-gray-600">{a.subtitle}</p>
                        <p className="mt-1 text-[11px] font-semibold text-emerald-700">{a.year}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* desktop grid */}
          <motion.div
            className="mt-6 hidden grid-cols-3 gap-5 sm:grid"
            initial="hidden"
            whileInView="enter"
            viewport={{ once: true }}
            variants={stagger}
          >
            {ACHIEVEMENTS.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.article
                  key={i}
                  variants={cardV}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-emerald-100 bg-white p-6 shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{a.title}</h3>
                      <p className="text-sm text-gray-600">{a.subtitle}</p>
                      <p className="mt-1 text-xs font-semibold text-emerald-700">{a.year}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* PHILOSOPHY + QUOTE */}
        <section className="grid grid-cols-1 gap-6 py-8 sm:gap-8 sm:py-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-sky-50 p-5 sm:p-10"
          >
            <h3 className="text-[clamp(1rem,2.4vw,1.25rem)] font-bold text-emerald-700">Philosophy</h3>
            <p className="mt-3 text-[15px] text-gray-700 sm:text-base">
              Education fosters agency. We build scalable systems that blend foundational learning with vocational
              skills—co-created with communities.
            </p>
            <ul className="mt-5 grid gap-3 text-[14px] sm:mt-6 sm:text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" /> Community-first programs
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="mt-0.5 h-5 w-5 text-emerald-600" /> Education for livelihoods
              </li>
              <li className="flex items-start gap-2">
                <Target className="mt-0.5 h-5 w-5 text-emerald-600" /> Measurable, transparent outcomes
              </li>
            </ul>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow sm:p-8"
          >
            <Quote className="mb-3 h-8 w-8 text-emerald-600 sm:mb-4 sm:h-10 sm:w-10" />
            <blockquote className="text-[15px] italic text-gray-700 sm:text-base">
              “Education is not just learning — it is empowerment that builds the future of communities.”
            </blockquote>
            <figcaption className="mt-3 text-xs text-gray-600 sm:mt-4 sm:text-sm">
              — Santhosh Kumar M
            </figcaption>
          </motion.figure>
        </section>

        {/* TIMELINE */}
        <section className="py-8 sm:py-10">
          <h2 className="text-[clamp(1.25rem,3.2vw,2rem)] font-bold">Journey</h2>
          <div className="relative mt-6 grid gap-6 sm:mt-8 sm:gap-8">
            <div className="absolute left-4 top-0 h-full w-px bg-emerald-200 md:left-1/2" />
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-start gap-3 sm:gap-4 ${
                  i % 2 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                <div
                  className={`relative ml-6 rounded-xl border border-emerald-100 bg-white p-4 shadow sm:rounded-2xl sm:p-5 md:w-[44%] ${
                    i % 2 ? "md:mr-6" : "md:ml-6"
                  }`}
                >
                  <div className="text-[11px] font-semibold text-emerald-700 sm:text-xs">{t.year}</div>
                  <div className="mt-1 text-[14.5px] text-gray-700 sm:text-base">{t.text}</div>
                </div>
                <div className="absolute left-3.5 top-4 grid h-4 w-4 place-items-center rounded-full border-4 border-white bg-emerald-500 shadow md:left-1/2 md:-translate-x-1/2 sm:top-5" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 p-6 text-white shadow-2xl sm:rounded-3xl sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 hidden h-72 w-72 rounded-full bg-white/10 blur-3xl sm:block" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 hidden h-72 w-72 rounded-full bg-white/10 blur-3xl sm:block" />
            <div className="relative z-10 flex flex-col items-center justify-between gap-4 text-center sm:gap-6 md:flex-row md:text-left">
              <div>
                <h3 className="text-[clamp(1.1rem,2.8vw,1.75rem)] font-extrabold">Inspired by the mission?</h3>
                <p className="mt-1 max-w-xl text-emerald-50">
                  Join Kalvikann Foundation as a volunteer, partner, or donor to help scale impact.
                </p>
              </div>
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
                <a
                  href="mailto:contact@kalvikann.org"
                  className="rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl sm:rounded-2xl"
                >
                  Contact Us
                </a>
                <a
                  href="https://www.linkedin.com/in/santhoshkumar-m1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:rounded-2xl"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL — Founder’s Note */}
      <AnimatePresence>
        {noteOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setNoteOpen(false)} />
            <motion.div
              initial={{ scale: 0.96, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b p-3 sm:p-4">
                <h3 className="flex items-center gap-2 text-[13px] font-semibold sm:text-sm">
                  <Feather className="h-4 w-4 text-emerald-600" /> Founder’s Note
                </h3>
                <button
                  onClick={() => setNoteOpen(false)}
                  className="rounded-md p-2 hover:bg-gray-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="max-h-[70vh] space-y-3 overflow-y-auto p-4 text-[14.5px] leading-relaxed sm:space-y-4 sm:p-6 sm:text-[clamp(0.95rem,1.6vw,1rem)]">
                <p className="text-gray-700">
                  “I believe every child, regardless of background, deserves quality education and the opportunity
                  to build a brighter future. Kalvikann Foundation is my humble step towards creating scalable,
                  inclusive, and sustainable education models.”
                </p>
                <p className="text-gray-700">
                  Our mission is not charity—it’s empowerment. Together, we can turn ideas into actions that
                  transform lives and entire communities.
                </p>
                <div className="text-right font-semibold text-emerald-700">— Santhosh Kumar M</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
