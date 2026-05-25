import React from 'react';
import Navbar from './portfolio/Navbar';
import Hero from './portfolio/Hero';
import About from './portfolio/About';
import Skills from './portfolio/Skills';
import Experience from './portfolio/Experience';
import Projects from './portfolio/Projects';
import Blog from './portfolio/Blog';
import Education from './portfolio/Education';
import Contact from './portfolio/Contact';
import Footer from './portfolio/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

