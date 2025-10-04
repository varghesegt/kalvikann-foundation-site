import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Info, User, Phone, Heart, Leaf } from "lucide-react";

const mainButtons = [
  { to: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
  { to: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
  { to: "/founder", label: "Founder", icon: <User className="w-5 h-5" /> },
  { to: "/contact", label: "Contact", icon: <Phone className="w-5 h-5" /> },
  { to: "/infinite-e", label: "Infinity-E", icon: <Leaf className="w-5 h-5" /> },
  { to: "/donation", label: "Donate", icon: <Heart className="w-5 h-5" /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoExpand, setLogoExpand] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 shadow-sm border-b border-green-100">
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">

          {/* 🔹 Brand */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => setLogoExpand(true)}
          >
            <motion.div
              className="h-12 w-20 flex items-center justify-center rounded-2xl border border-green-200 bg-gradient-to-br from-green-100 to-blue-50 shadow-md overflow-hidden"
              whileHover={{ rotate: 5 }}
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-10 object-contain"
              />
            </motion.div>
            <span className="hidden sm:inline-block font-extrabold text-2xl tracking-wide bg-gradient-to-r from-green-600 via-blue-600 to-green-500 text-transparent bg-clip-text animate-gradient-x">
              Kalvikann
            </span>
          </motion.div>

          {/* 🔹 Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg border border-green-300 hover:bg-green-50 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? "✖" : "☰"}
          </button>

          {/* 🔹 Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {mainButtons.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105"
                      : label === "Donate"
                      ? "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-lg hover:scale-105"
                      : "bg-green-50 text-green-700 hover:bg-green-600 hover:text-white"
                  }`}
                >
                  <span className="transition-transform group-hover:-translate-y-0.5">
                    {icon}
                  </span>
                  {label}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* 🔹 Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="md:hidden border-t border-green-200 bg-white shadow-lg"
            >
              <div className="px-4 py-4 space-y-3">
                {mainButtons.map(({ to, label, icon }) => {
                  const isActive = location.pathname === to;
                  return (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition ${
                        isActive
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                          : label === "Donate"
                          ? "bg-gradient-to-r from-green-400 to-blue-500 text-white hover:shadow-md"
                          : "bg-green-50 text-green-700 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      {icon}
                      {label}
                    </NavLink>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 🔹 Logo Expand Overlay */}
      <AnimatePresence>
        {logoExpand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 backdrop-blur-lg"
            onClick={() => setLogoExpand(false)}
          >
            <motion.img
              src="/images/logo.png"
              alt="Logo Expanded"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-72 h-auto drop-shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
