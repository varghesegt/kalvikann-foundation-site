// src/pages/Programs.jsx
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Star } from "lucide-react";

const programsData = [
  {
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    title: "Educational Workshops",
    description:
      "Interactive sessions to enhance learning, critical thinking, and creativity.",
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Skill Development",
    description:
      "Hands-on training in practical skills to prepare participants for real-world challenges.",
  },
  {
    icon: <Star className="w-8 h-8 text-purple-500" />,
    title: "Community Empowerment",
    description:
      "Programs designed to strengthen local communities and foster sustainable growth.",
  },
];

const stats = [
  { label: "Programs Run", value: 25, icon: <BookOpen className="w-8 h-8" /> },
  { label: "Participants", value: 500, icon: <Users className="w-8 h-8" /> },
  { label: "Impact Score", value: 95, icon: <Star className="w-8 h-8" /> },
];

export default function Programs() {
  return (
    <div className="overflow-x-hidden">
      {/* 🔹 Page Header */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-20 px-4 md:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-wide"
        >
          Our Programs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg md:text-xl"
        >
          Our programs focus on education, skill development, and community
          empowerment. Each initiative is designed to create meaningful impact,
          nurture talent, and provide opportunities for sustainable growth.
        </motion.p>
      </section>

      {/* 🔹 Programs Grid */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Explore Our Programs
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {programsData.map(({ icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-4 hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                {icon}
              </div>
              <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map(({ label, value, icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-lg py-8 flex flex-col items-center gap-4"
            >
              <div className="text-green-500">{icon}</div>
              <h3 className="text-3xl font-bold text-gray-900">{value}+</h3>
              <p className="text-gray-600">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔹 Call-to-Action Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join Our Programs Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8"
          >
            Be part of our mission to educate, empower, and inspire communities.
          </motion.p>
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-green-600 font-semibold rounded-full px-8 py-4 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Get Started
          </motion.a>
        </div>
      </section>
    </div>
  );
}
