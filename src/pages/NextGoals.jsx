import React from 'react';
import Hero from '@/components/Hero.jsx';

export default function NextGoals() {
  return (
    <div>
      <Hero />
      <section className="container-lg py-16">
        <h1 className="font-heading text-4xl text-primary mb-6">Next Goals</h1>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          Our upcoming goals focus on expanding educational programs, enhancing
          digital learning accessibility, and creating sustainable opportunities
          for community development. Together, we aim to shape a brighter future.
        </p>
      </section>
    </div>
  );
}
