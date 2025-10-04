import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import {
  BookOpen,
  Users,
  Leaf,
  HeartHandshake,
  GraduationCap,
  Globe,
  Settings2,
  CheckCircle2,
  Sparkles,
  Target,
  ChevronRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";

/**
 * Efforts — Ultra‑Premium Page (Scrollbar‑less + Responsive)
 * - Hides scrollbars visually (keeps scrolling behavior)
 * - Gradient mesh hero with motion orbs
 * - Sticky quick‑nav (active section highlight)
 * - Filterable efforts grid
 * - Program pipeline timeline
 * - Impact band & CTA
 */

const STATS = [
  { id: "schools", value: 120, label: "Schools Supported", suffix: "+" },
  { id: "students", value: 15000, label: "Students Impacted", suffix: "+" },
  { id: "volunteers", value: 300, label: "Active Volunteers", suffix: "+" },
  { id: "villages", value: 45, label: "Villages Reached", suffix: "+" },
];

const RAW_EFFORTS = [
  {
    title: "Quality Education",
    desc: "Modern classrooms, libraries, mentorship, and assessments that meet learners where they are.",
    icon: BookOpen,
    tags: ["Education"],
  },
  {
    title: "Community Development",
    desc: "Grassroots livelihood programs, SHGs, and participatory planning for long‑term resilience.",
    icon: Users,
    tags: ["Community"],
  },
  {
    title: "Sustainability",
    desc: "Eco‑awareness, waste segregation, water stewardship, and green classrooms.",
    icon: Leaf,
    tags: ["Sustainability"],
  },
  {
    title: "Healthcare Support",
    desc: "Health camps, wellness drives, menstrual health kits, and mental health first‑aid.",
    icon: HeartHandshake,
    tags: ["Health"],
  },
  {
    title: "Skill Development",
    desc: "Vocational cohorts, digital fluency, entrepreneurship, and career readiness.",
    icon: GraduationCap,
    tags: ["Skilling"],
  },
  {
    title: "Global Outreach",
    desc: "Knowledge exchange, remote mentorship, and global partner networks.",
    icon: Globe,
    tags: ["Community", "Education"],
  },
];

const FILTERS = ["All", "Education", "Community", "Sustainability", "Health", "Skilling"];

export default function Efforts() {
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState({});

  // Active section highlighting for quick‑nav
  useEffect(() => {
    const ids = ["overview", "stats", "efforts", "pipeline", "cta"];    
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = { ...prev };
          entries.forEach((e) => { if (e.isIntersecting) next[e.target.id] = true; });
          return next;
        });
      },
      { threshold: 0.42 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const filteredEfforts = useMemo(() => (activeFilter === "All" ? RAW_EFFORTS : RAW_EFFORTS.filter((e) => e.tags.includes(activeFilter))), [activeFilter]);

  const orbA = reduced ? {} : { x: [0, 28, 0], y: [0, -24, 0] };
  const orbB = reduced ? {} : { x: [0, -26, 0], y: [0, 22, 0] };

  return (
    <div className="no-scrollbar min-h-screen overflow-y-auto bg-gradient-to-br from-white via-emerald-50 to-sky-50 text-gray-900">
      {/* Global styles to hide scrollbars while preserving scroll */}
      <style>{`
        /* Hide scrollbars (keeps scroll functional) */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        /* Also hide on nested horizontal scrollers */
        .no-scrollbar-x::-webkit-scrollbar { display: none; }
        .no-scrollbar-x { -ms-overflow-style: none; scrollbar-width: none; }
        /* Improve touch targets on small screens */
        @media (max-width: 420px) {
          .btn { padding: 0.65rem 1rem; border-radius: 0.875rem; }
        }
      `}</style>

      {/* Motion mesh background */}
      <motion.div aria-hidden animate={orbA} transition={{ repeat: Infinity, duration: 14 }} className="pointer-events-none absolute -top-28 -left-32 h-[520px] w-[520px] rounded-full bg-emerald-300/25 blur-3xl" />
      <motion.div aria-hidden animate={orbB} transition={{ repeat: Infinity, duration: 18 }} className="pointer-events-none absolute -bottom-28 -right-32 h-[560px] w-[560px] rounded-full bg-sky-300/25 blur-3xl" />

      {/* Sticky quick‑nav */}
      <nav className="sticky top-0 z-40 border-b border-emerald-100/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="no-scrollbar-x mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-3 py-2.5 text-[13px] sm:text-sm">
          {[
            { id: "overview", label: "Overview" },
            { id: "stats", label: "Impact" },
            { id: "efforts", label: "Efforts" },
            { id: "pipeline", label: "Pipeline" },
            { id: "cta", label: "Get Involved" },
          ].map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium transition ${
                visible[l.id]
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" /> {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <header id="overview" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-12 md:pt-16 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-3 sm:px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-yellow-500" /> Real work. Real outcomes.
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-4 text-[clamp(1.9rem,6vw,4rem)] font-extrabold leading-tight">
          Our Efforts
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.8 }} className="mx-auto mt-3 max-w-3xl text-[clamp(0.95rem,1.6vw,1.125rem)] text-gray-700">
          We co‑create programs across education, sustainability, healthcare, and community upliftment—measurable, transparent, and locally led.
        </motion.p>
      </header>

      {/* Stats */}
      <section id="stats" className="mx-auto max-w-6xl px-4 sm:px-6 pb-10 md:pb-12">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="rounded-2xl border border-emerald-100 bg-white/80 p-5 sm:p-6 text-center shadow-xl backdrop-blur"
            >
              <div className="text-[1.6rem] sm:text-4xl font-extrabold text-emerald-700">
                <CountUp end={s.value} duration={2} separator="," />{s.suffix}
              </div>
              <div className="mt-1 text-[12px] sm:text-sm font-medium text-gray-700">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Efforts + Filter */}
      <section id="efforts" className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10">
        <div className="text-center">
          <h2 className="text-[clamp(1.4rem,3.6vw,2.5rem)] font-extrabold">Key Areas of Focus</h2>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">Filter to explore how each stream delivers outcomes on the ground.</p>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`btn rounded-full border px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold shadow-sm transition ${
                activeFilter === f
                  ? "border-sky-500 bg-sky-50 text-sky-700"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-7 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3" initial={false} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {filteredEfforts.map((effort) => {
              const Icon = effort.icon;
              return (
                <motion.article
                  key={effort.title}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-5 sm:p-6 shadow-xl backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 text-white shadow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{effort.title}</h3>
                      <p className="mt-1 text-[13px] sm:text-sm text-gray-600">{effort.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {effort.tags.map((t) => (
                          <span key={t} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-emerald-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -right-10 top-4 h-8 w-32 rotate-12 bg-gradient-to-r from-emerald-200/40 to-sky-200/40 opacity-0 blur group-hover:opacity-100" />
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Program Pipeline */}
      <section id="pipeline" className="bg-sky-50 py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-[clamp(1.35rem,3.2vw,2.25rem)] font-extrabold text-emerald-700">How Programs Come to Life</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">From discovery to delivery—clear milestones, transparent reporting.</p>
          </div>

          <div className="mt-8 md:mt-10 grid items-start gap-5 md:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {[
              { t: "Needs Discovery", d: "Community surveys, school audits, baseline & stakeholder mapping.", i: Target },
              { t: "Co‑Design", d: "Participatory planning with local leaders and educators.", i: Settings2 },
              { t: "Pilot", d: "Small cohorts, fast feedback, iterative improvements.", i: CheckCircle2 },
              { t: "Scale", d: "Expand across clusters with training, toolkits, and QA.", i: ShieldCheck },
              { t: "Report", d: "Dashboards, visits, and outcome reports for partners.", i: MapPin },
            ].map((s, idx) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative rounded-3xl border border-emerald-100 bg-white p-5 sm:p-6 text-center shadow-xl"
              >
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 text-white">
                  {React.createElement(s.i, { className: "h-6 w-6" })}
                </div>
                <h3 className="mt-3 text-sm sm:text-base font-semibold text-gray-900">{s.t}</h3>
                <p className="mt-1 text-[13px] sm:text-sm text-gray-600">{s.d}</p>
                {idx < 4 && <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-emerald-400 md:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact strip */}
      <section className="bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-600 py-10 md:py-12 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-3 md:gap-4 px-4 sm:px-6 text-center text-xs sm:text-sm md:text-base">
          {[
            { n: 500, label: "Students Supported" },
            { n: 200, label: "Families Uplifted" },
            { n: 50, label: "Community Projects" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 p-4 md:p-5 shadow backdrop-blur">
              <div className="text-xl md:text-3xl font-extrabold">{s.n}+ </div>
              <div className="text-emerald-50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 p-6 sm:p-8 text-white shadow-2xl"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 sm:h-72 w-56 sm:w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 sm:h-72 w-56 sm:w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-4 sm:gap-6 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-[clamp(1.35rem,3.2vw,2.25rem)] font-extrabold">Be a part of our mission</h3>
              <p className="mt-1 max-w-xl text-emerald-50">Volunteer, donate, or partner with us to uplift more lives across communities. Together, we create a brighter future.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="/volunteer" className="btn rounded-2xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl">Volunteer</a>
              <a href="/donation" className="btn rounded-2xl border border-white/40 bg-white/10 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">Donate</a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
