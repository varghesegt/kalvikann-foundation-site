import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Founder from './pages/Founder.jsx';
import Efforts from './pages/Efforts.jsx';
import Achievements from './pages/Achievements.jsx';
import NextGoals from './pages/NextGoals.jsx';
import Donation from './pages/Donation.jsx';
import Contact from './pages/Contact.jsx';
import Programs from './pages/Programs.jsx';
import Gallery from './pages/Gallery.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Terms from './pages/Terms.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/efforts" element={<Efforts />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/next-goals" element={<NextGoals />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
