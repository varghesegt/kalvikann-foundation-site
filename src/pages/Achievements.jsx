import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import { Award, Star, CheckCircle2, Users, Layers, Sparkles, Trophy, Crown, ArrowRight } from "lucide-react";

/**
 * Achievements — Ultra‑Premium Version
 * - Fluid type via clamp(), refined spacing across breakpoints
 * - Motion respects prefers-reduced-motion
 * - Visibility-aware counters (CountUp triggers when on-screen)
 * - Award showcase cards with ribbons + hover lift
 * - Alternating timeline w/ connector lines
 * - Partner marquee (CSS-only, gpu-accelerated)
 * - CTA with gradient mesh + particles (disabled for reduced motion)
 * - A11y: landmarks, aria labels, keyboard focus rings
 */

const ACHIEVEMENTS = [
  { title: "National Education Award", subtitle: "Recognized for excellence in community learning initiatives", icon: Award, year: "2018" },
  { title: "Sustainable Impact 2023", subtitle: "Model pilot for green classrooms", icon: Star, year: "2023" },
  { title: "Skill Development Drive", subtitle: "10+ vocational cohorts trained", icon: CheckCircle2, year: "2022" },
  { title: "Community Expansion", subtitle: "Reached 30+ rural communities with programs", icon: Users, year: "2024" },
  { title: "Tech-Ed Recognition", subtitle: "Integrating EdTech solutions for learning scalability", icon: Layers, year: "2023" },
];

const STATS = [
  { id: "projects", value: 50, label: "Projects Completed", suffix: "+" },
  { id: "volunteers", value: 250, label: "Volunteers Engaged", suffix: "+" },
  { id: "students", value: 10000, label: "Students Impacted", suffix: "+" },
  { id: "partners", value: 40, label: "Partners Collaborated", suffix: "+" },
];

const PARTNERS = [
  "/images/partner1.png",
  "/images/partner2.png",
  "/images/partner3.png",
  "/images/partner4.png",
  "/images/partner5.png",
  "/images/partner6.png",
];

export default function Achievements() {
  const reduceMotion = useReducedMotion();
  const heroFloatA = reduceMotion ? {} : { x: [0, 30, 0], y: [0, -30, 0] };
  const heroFloatB = reduceMotion ? {} : { x: [0, -30, 0], y: [0, 30, 0] };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-sky-50 text-gray-900">
      {/* HERO */}
      <header aria-labelledby="ach-hero-heading" className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        {/* gradient mesh / blobs */}
        <motion.div aria-hidden animate={heroFloatA} transition={{ repeat: Infinity, duration: 12 }} className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <motion.div aria-hidden animate={heroFloatB} transition={{ repeat: Infinity, duration: 14 }} className="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden />
            Celebrating Impact
          </div>
          <h1 id="ach-hero-heading" className="text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-tight">
            Achievements &amp; Milestones
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-[clamp(0.95rem,1.6vw,1.125rem)] text-gray-700">
            Kalvikann Foundation has created transformative impact through education, skill development, and community initiatives.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#stats" className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl">View Stats</a>
            <a href="#timeline" className="rounded-2xl border border-emerald-200 bg-white/70 px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur transition hover:bg-white">See Timeline</a>
          </div>
        </div>
      </header>

      {/* STATS */}
      <StatsSection />

      {/* AWARDS GRID */}
      <AwardsGrid />

      {/* TIMELINE */}
      <TimelineSection />

      {/* PARTNERS */}
      <PartnersMarquee />

      {/* CTA */}
      <CTA />
    </main>
  );
}

/* -------------------- Stats -------------------- */
function StatsSection() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" className="relative py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold text-emerald-700">Impact at a Glance</h2>
        <div ref={containerRef} className="mt-8 grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow backdrop-blur"
            >
              <div className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                {inView && !reduceMotion ? (
                  <CountUp end={stat.value} duration={1.8} separator="," />
                ) : (
                  stat.value
                )}
                <span className="ml-1 align-top text-base">{stat.suffix}</span>
              </div>
              <div className="mt-1 text-sm font-medium text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Awards Grid -------------------- */
function AwardsGrid() {
  const cardVariants = { hidden: { opacity: 0, y: 18 }, enter: { opacity: 1, y: 0 } };
  return (
    <section aria-labelledby="awards-heading" className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="awards-heading" className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold text-emerald-700">Milestones & Recognitions</h2>
        <motion.div
          initial="hidden"
          whileInView="enter"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, enter: { transition: { staggerChildren: 0.12 } } }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ACHIEVEMENTS.map((ach, i) => {
            const Icon = ach.icon;
            return (
              <motion.article
                key={ach.title + i}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-xl backdrop-blur"
              >
                {/* ribbon */}
                <div className="pointer-events-none absolute -right-10 -top-8 rotate-45 bg-gradient-to-r from-emerald-500 to-sky-500 px-12 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  {ach.year}
                </div>
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{ach.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{ach.subtitle}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Trophy wall (optional highlight row) */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[{ icon: Trophy, label: "National Honors" }, { icon: Crown, label: "Category Leader" }, { icon: Star, label: "Peer Choice" }].map((t, i) => (
            <div key={t.label + i} className="flex items-center justify-center gap-3 rounded-xl border border-emerald-100 bg-white/70 p-4 text-emerald-700 shadow-sm">
              {React.createElement(t.icon, { className: "h-5 w-5" })}
              <span className="text-sm font-semibold">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Timeline -------------------- */
function TimelineSection() {
  const items = ACHIEVEMENTS.sort((a, b) => Number(a.year) - Number(b.year));
  return (
    <section id="timeline" aria-labelledby="timeline-heading" className="bg-sky-50 py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 id="timeline-heading" className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold text-emerald-700">Achievement Timeline</h2>
        <div className="relative mx-auto mt-10 grid max-w-3xl gap-8">
          {items.map((ach, i) => (
            <motion.div
              key={ach.title + i}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-start gap-4 ${i % 2 ? "flex-row-reverse text-right" : ""}`}
            >
              {/* node */}
              <div className="relative mt-2 h-4 w-4 flex-shrink-0 rounded-full bg-emerald-500 shadow ring-4 ring-white" />
              {/* connector line */}
              <div className={`absolute left-2 top-6 h-full w-[2px] -translate-x-1/2 bg-emerald-200 ${i === items.length - 1 ? "hidden" : ""}`} />
              <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-emerald-100">
                <div className="text-xs font-bold uppercase tracking-wide text-emerald-700">{ach.year}</div>
                <div className="text-base font-semibold text-gray-900">{ach.title}</div>
                <p className="mt-1 text-sm text-gray-600">{ach.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Partners Marquee -------------------- */
function PartnersMarquee() {
  const doubled = useMemo(() => [...PARTNERS, ...PARTNERS], []);
  return (
    <section aria-labelledby="partners-heading" className="py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="partners-heading" className="text-center text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold text-emerald-700">Our Partners & Collaborators</h2>
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-emerald-100 bg-white/60 p-4 backdrop-blur">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/90 to-transparent" />
          <div className="marquee flex items-center gap-10">
            {doubled.map((src, i) => (
              <img key={src + i} src={src} alt={`Partner ${i + 1}`} loading="lazy" width="160" height="40" className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- CTA -------------------- */
function CTA() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 py-16 text-white sm:py-20">
      {/* mesh glow */}
      {!reduceMotion && (
        <>
          <motion.div aria-hidden animate={{ x: [0, 60, 0] }} transition={{ repeat: Infinity, duration: 18 }} className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <motion.div aria-hidden animate={{ y: [0, -60, 0] }} transition={{ repeat: Infinity, duration: 24 }} className="pointer-events-none absolute -top-28 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold">Inspired by our journey?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50">
          Join Kalvikann Foundation as a volunteer, partner, or donor to help scale our impact and reach more communities.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:contact@kalvikann.org" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl">
            Contact Us <ArrowRight className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/santhoshkumar-m1/" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

