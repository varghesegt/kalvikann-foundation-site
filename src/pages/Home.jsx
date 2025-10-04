// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import CountUp from "react-countup";
import {
  ArrowLeft,
  ArrowRight,
  ImageIcon,
  User,
  Award,
  Sparkles,
  Grid,
  Quote,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

/**
 * Advanced Home.jsx
 * - Preloads banner images
 * - Smooth, flicker-free background slider using motion.div + backgroundImage
 * - Parallax layers
 * - Swipe + keyboard navigation for slider
 * - Card grid with 3D tilt (mouse/touch)
 * - Stats with CountUp and aria-live
 * - Testimonials carousel with autoplay & swipe
 * - CTA with animated SVG particles
 * - Accessibility & reduced-motion support
 *
 * NOTE: TailwindCSS classes are used heavily. Adjust as needed.
 */

/* ---------- Slider Data ---------- */
const slides = [
  {
    id: 1,
    img: "/images/img1.jpg",
    title: "Innovating for a Better Tomorrow",
    subtitle: "Building sustainable and smart solutions for the future.",
    cta: "/about",
  },
  {
    id: 2,
    img: "/images/img2.jpg",
    title: "Empowering Communities",
    subtitle: "Driving growth through technology and creativity.",
    cta: "/programs",
  },
  {
    id: 3,
    img: "/images/img3.jpg",
    title: "Shaping the Future",
    subtitle: "Join us on a journey of innovation and impact.",
    cta: "/contact",
  },
];

/* ---------- Card Data ---------- */
const cards = [
  {
    id: "about",
    title: "About Us",
    desc:
      "Pioneering community-first innovations across education, sustainability, and digital inclusion — building a brighter tomorrow for all.",
    img: "/images/about.png",
    icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
    link: "/about",
  },
  {
    id: "founder",
    title: "Founder",
    desc:
      "Visionary leaders driving every initiative with passion, integrity, and long-term impact in mind.",
    img: "/images/founder.png",
    icon: <User className="w-6 h-6 text-purple-400" />,
    link: "/founder",
  },
  {
    id: "achievements",
    title: "Achievements",
    desc:
      "100+ transformative projects · 50,000+ lives touched and empowered worldwide.",
    img: "/images/achievements.jpg",
    icon: <Award className="w-6 h-6 text-yellow-400" />,
    link: "/achievements",
  },
  {
    id: "efforts",
    title: "Efforts",
    desc:
      "Impact-driven campaigns, hands-on skill development workshops, and sustainable green-tech pilots.",
    img: "/images/efforts.png",
    icon: <Grid className="w-6 h-6 text-emerald-400" />,
    link: "/efforts",
  },
  {
    id: "gallery",
    title: "Gallery",
    desc:
      "Stories and snapshots capturing unforgettable moments from our fieldwork and events.",
    img: "/images/gallery1.png",
    icon: <ImageIcon className="w-6 h-6 text-rose-400" />,
    link: "/gallery",
  },
  {
    id: "contact",
    title: "Contact",
    desc:
      "Let’s connect! Reach out to collaborate, volunteer, or support our initiatives.",
    img: "/images/contact.png",
    icon: <Phone className="w-6 h-6 text-green-400" />,
    link: "/contact",
  },
];

/* ---------- Testimonials Data ---------- */
const testimonials = [
  {
    quote:
      "This foundation has changed countless lives with education and empowerment.",
    name: "Amit Sharma",
    role: "Volunteer",
  },
  {
    quote:
      "Their work in rural communities is truly inspiring. The dedication is unmatched.",
    name: "Priya Verma",
    role: "Donor",
  },
  {
    quote:
      "I’ve seen first-hand how impactful their skill workshops are. A brilliant initiative.",
    name: "Rahul Mehta",
    role: "Beneficiary",
  },
];

/* ---------- Utility: preload images ---------- */
function usePreloadImages(urls = []) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setLoaded(true);
      return;
    }
    let mounted = true;
    let loadedCount = 0;

    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (mounted && loadedCount >= urls.length) setLoaded(true);
      };
      img.onerror = () => {
        // still count errors so we don't hang
        loadedCount += 1;
        if (mounted && loadedCount >= urls.length) setLoaded(true);
      };
    });

    return () => {
      mounted = false;
    };
  }, [urls]);

  return loaded;
}

/* ---------- Helper: useInterval with pause capability ---------- */
function useInterval(callback, delay) {
  const savedRef = useRef();
  useEffect(() => {
    savedRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => savedRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/* ---------- Parallax layer component ---------- */
function ParallaxLayer({ children, speed = 0.2 }) {
  // simple parallax tied to window scroll
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <motion.div
      style={{ transform: `translateY(${offset}px)` }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

/* ---------- Animated particle background used in CTA ---------- */
function ParticleBackground({ seed = 1 }) {
  const reduced = useReducedMotion();
  // Simple SVG circles animated with CSS keyframes
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      aria-hidden
    >
      {/* A handful of translucent circles for subtle bokeh */}
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {!reduced && (
        <>
          <circle cx="10" cy="20" r="12" fill="url(#g1)" className="animate-bob-slow" />
          <circle cx="80" cy="10" r="8" fill="url(#g1)" className="animate-bob" />
          <circle cx="60" cy="70" r="10" fill="url(#g1)" className="animate-bob-slower" />
          <circle cx="25" cy="80" r="6" fill="url(#g1)" className="animate-bob" />
        </>
      )}
      {/* CSS animations for classes below are recommended in your global CSS:
          .animate-bob { animation: bob 8s ease-in-out infinite; }
          .animate-bob-slow { animation: bob 12s ease-in-out infinite; }
          .animate-bob-slower { animation: bob 18s ease-in-out infinite; }
          @keyframes bob { 0% { transform: translateY(0) } 50% { transform: translateY(-6px) } 100% { transform: translateY(0) } }
       */}
    </svg>
  );
}

/* ---------- Banner / Hero Slider ---------- */
function Banner({ slidesData }) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  // slider state
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // preloading for smooth transitions
  const allUrls = useMemo(() => slidesData.map((s) => s.img), [slidesData]);
  const imagesLoaded = usePreloadImages(allUrls);

  // autoplay
  useInterval(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slidesData.length);
  }, 8000);

  // swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slidesData.length);
    },
    onSwipedRight: () => {
      setDirection(-1);
      setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    },
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setDirection(1);
        setIndex((prev) => (prev + 1) % slidesData.length);
      } else if (e.key === "ArrowLeft") {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slidesData.length]);

  // variants for motion
  const variants = {
    enter: (dir) => ({
      opacity: 0,
      scale: 1.05,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? -40 : 40,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  // if images not loaded, show a neutral loader (avoid gray flash)
  if (!imagesLoaded) {
    return (
      <section className="relative w-full h-[70vh] md:h-[100dvh] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-spin-slow" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Loading visual experience...</h2>
              <p className="text-sm text-gray-500">Preloading images for a smooth display</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      {...handlers}
      aria-roledescription="carousel"
      aria-label="Hero slides"
      className="relative w-full h-[100dvh] md:h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background slides as motion.div with background-image -> avoids flicker */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slidesData[index].id}
          custom={direction}
          variants={reduced ? {} : variants}
          initial={reduced ? { opacity: 1 } : "enter"}
          animate={reduced ? { opacity: 1 } : "center"}
          exit={reduced ? { opacity: 0 } : "exit"}
          className="absolute inset-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(rgba(5,10,20,0.35), rgba(5,10,20,0.35)), url(${slidesData[index].img})`,
          }}
        />
      </AnimatePresence>

      {/* subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent z-10" />

      {/* Foreground content */}
      <div className="relative z-20 max-w-4xl text-center px-6 md:px-8">
        <motion.h1
          key={slidesData[index].id + "-title"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight"
        >
          {slidesData[index].title}
        </motion.h1>

        <motion.p
          key={slidesData[index].id + "-subtitle"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="mt-4 md:mt-6 text-sm md:text-lg text-gray-200 max-w-3xl mx-auto"
        >
          {slidesData[index].subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 md:mt-8 flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate(slidesData[index].cta)}
            className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-0.5"
          >
            Explore
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-5 py-3 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20 transition"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* left/right controls (keyboard + accessible) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
        <button
          aria-label="Previous slide"
          onClick={() => {
            setDirection(-1);
            setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
          }}
          className="hidden md:inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md w-10 h-10 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <button
          aria-label="Next slide"
          onClick={() => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % slidesData.length);
          }}
          className="hidden md:inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md w-10 h-10 rounded-full transition"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* pagination dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slidesData.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-transform ${
              i === index ? "bg-white scale-125 shadow-lg" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Card Grid with Tilt + Stagger ---------- */
function CardGrid({ cardsData }) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  return (
    <section className="py-20 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12">
          Our Work & Impact
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {cardsData.map((c, i) => (
            <TiltCard
              key={c.id}
              card={c}
              index={i}
              onClick={() => navigate(c.link)}
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* TiltCard: internal helper - mouse-based tilt and 3D depth */
function TiltCard({ card, onClick, index = 0, reduced = false }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 1 });

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * 18; // rotate y
      const rx = (py - 0.5) * -10; // rotate x
      setTilt({ rx, ry, sx: 1.02 });
    }
    function handleLeave() {
      setTilt({ rx: 0, ry: 0, sx: 1 });
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("touchmove", handleMove, { passive: true });
    el.addEventListener("touchend", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("touchmove", handleMove);
      el.removeEventListener("touchend", handleLeave);
    };
  }, [reduced]);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
      className="cursor-pointer group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl backdrop-blur-xl border border-white/10 bg-white/40 transform-gpu"
      style={{
        perspective: 1200,
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.sx})`,
      }}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={card.img}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/10 rounded-lg p-2">{card.icon}</div>
          <h3 className="font-semibold text-lg text-gray-900">{card.title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{card.desc}</p>
      </div>
    </motion.div>
  );
}

/* ---------- Stats with CountUp & subtle icon background ---------- */
function Stats() {
  const stats = [
    { value: 100, label: "Projects Completed", icon: <Award className="w-8 h-8 text-yellow-400" /> },
    { value: 50000, label: "Lives Impacted", icon: <Heart className="w-8 h-8 text-red-400" /> },
    { value: 200, label: "Volunteers", icon: <User className="w-8 h-8 text-indigo-400" /> },
    { value: 25, label: "Communities Served", icon: <Grid className="w-8 h-8 text-emerald-400" /> },
  ];

  // reduced-motion friendly
  const reduced = useReducedMotion();

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.12 }}
            className="relative p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="bg-white p-3 rounded-full shadow-md">{s.icon}</div>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {!reduced ? (
                  <CountUp end={s.value} duration={2.5} separator="," /> 
                ) : (
                  s.value
                )}
                {s.label.includes("Lives") ? "+" : ""}
              </h3>
              <p className="mt-2 text-gray-600">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials Carousel ---------- */
function TestimonialsCarousel({ items }) {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const len = items.length;
  const handlers = useSwipeable({
    onSwipedLeft: () => setIdx((i) => (i + 1) % len),
    onSwipedRight: () => setIdx((i) => (i - 1 + len) % len),
    trackMouse: true,
  });

  useInterval(() => {
    setIdx((i) => (i + 1) % len);
  }, reduced ? null : 6000);

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Voices of Change</h2>

        <div {...handlers} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 md:p-12 mx-4 md:mx-0"
            >
              <Quote className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <p className="text-gray-700 italic leading-relaxed">
                “{items[idx].quote}”
              </p>
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900">{items[idx].name}</h4>
                <p className="text-sm text-gray-500">{items[idx].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* pager */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`View testimonial ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`w-3 h-3 rounded-full ${i === idx ? "bg-gray-900" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA with particles + buttons ---------- */
function CTA() {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-700 via-indigo-600 to-green-500 text-white overflow-hidden">
      {/* particle background */}
      <ParticleBackground />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
        >
          Be Part of the Movement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 text-md md:text-lg text-blue-100"
        >
          Join us in building a better tomorrow through innovation, compassion, and collaboration.
        </motion.p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-blue-700 rounded-full font-semibold shadow-xl hover:shadow-2xl transition"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate("/founder")}
            className="px-6 py-3 rounded-full border border-white/40 hover:bg-white/10 transition"
          >
            Meet Founder
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Main Home Page ---------- */
export default function Home() {
  // ensure the banner images are preloaded earlier to avoid flicker even if user navigates directly here
  const preloadUrls = useMemo(() => slides.map((s) => s.img), []);
  usePreloadImages(preloadUrls); // we don't care about the returned flag here; Banner also preloads

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white min-h-screen antialiased text-gray-800">
      <Banner slidesData={slides} />
      <main>
        <CardGrid cardsData={cards} />
        <Stats />
        <TestimonialsCarousel items={testimonials} />
        <CTA />
      </main>
    </div>
  );
}
