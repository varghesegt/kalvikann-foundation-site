import React from 'react';
import Hero from '@/components/Hero.jsx';

export default function Terms() {
  return (
    <div>
      <Hero />
      <section className="container-lg py-16">
        <h1 className="font-heading text-4xl text-primary mb-6">Terms & Conditions</h1>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          These are the terms and conditions of our organization. By accessing
          or using our services, you agree to comply with the rules, policies,
          and guidelines outlined here. Please review this section carefully.
        </p>
      </section>
    </div>
  );
}
