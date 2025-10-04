// src/pages/Gallery.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
  "/images/gallery7.jpg",
  "/images/gallery8.jpg",
  "/images/gallery9.jpg",
  "/images/gallery10.jpg",
  "/images/gallery11.jpg",
  "/images/gallery12.jpg",
  "/images/gallery13.png",
  "/images/gallery14.png",
  "/images/gallery15.png",
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);       // src string
  const [loaded, setLoaded] = useState({});
  const [index, setIndex] = useState(-1);               // numeric pointer for mobile UI
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  const preloadImage = useCallback((i) => {
    if (i >= 0 && i < IMAGES.length) {
      const img = new Image();
      img.src = IMAGES[i];
    }
  }, []);

  // keep selected/index in sync
  useEffect(() => {
    if (selected) {
      const idx = IMAGES.indexOf(selected);
      setIndex(idx);
    } else {
      setIndex(-1);
    }
  }, [selected]);

  // keyboard nav
  useEffect(() => {
    const handleKey = (e) => {
      if (!selected) return;
      const idx = IMAGES.indexOf(selected);
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected(IMAGES[(idx + 1) % IMAGES.length]);
      if (e.key === "ArrowLeft") setSelected(IMAGES[(idx - 1 + IMAGES.length) % IMAGES.length]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  // neighbor preload
  useEffect(() => {
    if (selected) {
      const idx = IMAGES.indexOf(selected);
      preloadImage(idx + 1);
      preloadImage(idx - 1);
    }
  }, [selected, preloadImage]);

  // swipe gestures in modal
  const onTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    touchStartTime.current = Date.now();
  };

  const onTouchEnd = () => {
    if (!selected) return;
    const elapsed = Date.now() - touchStartTime.current;
    const dx = (lastTouchX.current ?? 0) - touchStartX.current;
    const dy = (lastTouchY.current ?? 0) - touchStartY.current;

    // swipe should be fast and mostly horizontal
    const isHorizontal = Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 36 && elapsed < 600;
    if (isHorizontal) {
      const idx = IMAGES.indexOf(selected);
      if (dx < 0) setSelected(IMAGES[(idx + 1) % IMAGES.length]); // left swipe -> next
      else setSelected(IMAGES[(idx - 1 + IMAGES.length) % IMAGES.length]); // right swipe -> prev
    }
  };

  const lastTouchX = useRef(0);
  const lastTouchY = useRef(0);
  const onTouchMove = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    lastTouchX.current = t.clientX;
    lastTouchY.current = t.clientY;
  };

  const goPrev = () => {
    const idx = IMAGES.indexOf(selected);
    setSelected(IMAGES[(idx - 1 + IMAGES.length) % IMAGES.length]);
  };
  const goNext = () => {
    const idx = IMAGES.indexOf(selected);
    setSelected(IMAGES[(idx + 1) % IMAGES.length]);
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {/* soft background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-green-300/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl -z-10" />

      {/* intro */}
      <section className="container mx-auto px-6 py-16 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4
                     text-[clamp(2rem,6vw,3.75rem)] leading-[1.05]"
        >
          Our Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[clamp(1rem,1.8vw,1.25rem)] text-gray-700 leading-relaxed"
        >
          Explore highlights from our events, initiatives, and community programs. Each picture
          reflects dedication, joy, and positive change.
        </motion.p>
      </section>

      {/* masonry grid (2→3→4 columns, tighter on mobile) */}
      <section className="container mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {IMAGES.map((src, i) => (
            <motion.button
              aria-label={`Open image ${i + 1}`}
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer break-inside-avoid outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              onClick={() => setSelected(src)}
            >
              {/* aspect placeholder to reduce CLS on mobile */}
              <div className="w-full rounded-2xl bg-gray-100">
                {!loaded[src] && (
                  <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-2xl" />
                )}
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  className={`w-full h-auto object-cover rounded-2xl transition duration-500 ${
                    loaded[src] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [src]: true }))}
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white font-semibold text-sm sm:text-base">View</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* content wrapper uses safe-area + 100dvh for mobile */}
            <div
              className="flex h-[100dvh] w-full items-center justify-center p-3 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))]"
              onClick={(e) => {
                // click backdrop to close
                if (e.target === e.currentTarget) setSelected(null);
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.div
                className="relative max-w-6xl w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.92 }}
              >
                <img
                  src={selected}
                  alt="Expanded"
                  className="w-full max-h-[78dvh] object-contain bg-black"
                />

                {/* close (larger target for mobile) */}
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 rounded-full p-3 shadow-lg hover:bg-white transition"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>

                {/* prev / next — thumb-reachable on phones */}
                <button
                  onClick={goPrev}
                  aria-label="Previous"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition"
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>

                {/* mobile pagination dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5">
                  {IMAGES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full transition ${
                        i === index ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
