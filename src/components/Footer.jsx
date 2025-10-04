import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const explore = [
    { to: "/programs", label: "Programs" },
    { to: "/volunteer", label: "Volunteer" },
    { to: "/careers", label: "Careers" },
    { to: "/donation", label: "Donate" },
  ];
  const organization = [
    { to: "/about", label: "About" },
    { to: "/founder", label: "Founder" },
    { to: "/contact", label: "Contact" },
    { to: "/infinite-e", label: "Infinity-E" },
  ];
  const socials = [
    { icon: <FaFacebookF size={16} />, href: "#" },
    { icon: <FaInstagram size={16} />, href: "#" },
    { icon: <FaLinkedinIn size={16} />, href: "#" },
    { icon: <FaTwitter size={16} />, href: "#" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-t border-gray-200">
      {/* Floating background decor */}
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-green-300/20 blur-3xl -z-10"
      />
      <motion.div
        animate={{ x: [0, 35, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-blue-300/20 blur-3xl -z-10"
      />

      {/* CTA Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
        <motion.h3
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-gray-900"
        >
          Stay Connected
        </motion.h3>
        <motion.p
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
        >
          Join our community to receive updates on impactful programs and ways
          to get involved.
        </motion.p>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-10" />
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 grid gap-12 md:grid-cols-4 text-center md:text-left">
        {/* Brand */}
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} viewport={{ once: true }}>
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Kalvikann Foundation
          </h3>
          <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base max-w-sm mx-auto md:mx-0">
            Empowering communities through education & sustainable development.
            Together, we build a better tomorrow.
          </p>
          {/* Social */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                href={s.href}
                className="p-2 rounded-full border border-gray-300 hover:border-green-500 hover:bg-green-500 hover:text-white transition shadow-sm"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Organization */}
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} transition={{ delay: 0.1 }} viewport={{ once: true }}>
          <h4 className="font-semibold text-gray-900 uppercase tracking-wide text-sm">
            Organization
          </h4>
          <ul className="mt-4 flex flex-col gap-3 text-base">
            {organization.map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                className="transition"
              >
                <NavLink
                  to={link.to}
                  className="hover:text-green-600 hover:underline underline-offset-4 transition"
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Explore */}
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} transition={{ delay: 0.2 }} viewport={{ once: true }}>
          <h4 className="font-semibold text-gray-900 uppercase tracking-wide text-sm">
            Explore
          </h4>
          <ul className="mt-4 flex flex-col gap-3 text-base">
            {explore.map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5 }}
                className="transition"
              >
                <NavLink
                  to={link.to}
                  className="hover:text-green-600 hover:underline underline-offset-4 transition"
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact CTA */}
        <motion.div initial="hidden" whileInView="show" variants={fadeUp} transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <h4 className="font-semibold text-gray-900 uppercase tracking-wide text-sm">
            Reach Us
          </h4>
          <p className="mt-4 text-gray-600 text-sm max-w-xs mx-auto md:mx-0">
            Have questions or want to collaborate? Reach out directly.
          </p>
          <NavLink
            to="/contact"
            className="mt-5 inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium shadow-md hover:shadow-2xl hover:-translate-y-0.5 transition text-sm sm:text-base"
          >
            Contact Us
          </NavLink>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 py-5 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-700">
            Kalvikann Foundation
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
