import React from 'react';
import { Github, Mail, MapPin, Download, ArrowRight } from 'lucide-react';

const HERO_BG = 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701402939_690cd220.png';
const HEADSHOT = 'https://d64gsuwffb70l.cloudfront.net/6a14161523547f4294e8098a_1779701354546_ea11cb7b.jpg';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020]/70 via-[#0b1020]/85 to-[#0b1020]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center w-full">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for new opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            Hi, I'm <span className="text-cyan-400">Samuel Mbogo</span>
            <br />
            Full Stack <span className="bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">Software Engineer</span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Proactive and results-driven engineer with 2+ years of experience designing,
            developing, and deploying scalable web and mobile applications using React,
            Node.js, Express, and MongoDB.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => scrollTo('#projects')}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-xl hover:shadow-orange-500/40 transition-all"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-400/50 text-cyan-300 font-semibold hover:bg-cyan-400/10 transition-all"
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            <a href="mailto:Sammbogo81@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Mail className="w-4 h-4" /> Sammbogo81@gmail.com
            </a>
            <a href="https://github.com/samuel-m765" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
              <Github className="w-4 h-4" /> samuel-m765
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Nairobi, Kenya
            </span>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/30 to-orange-500/30 rounded-3xl blur-2xl" />
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
            <img src={HEADSHOT} alt="Samuel Mbogo" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#0b1020] border border-cyan-400/30 rounded-xl px-4 py-3 shadow-lg">
            <div className="text-2xl font-bold text-cyan-400">2+</div>
            <div className="text-xs text-slate-400">Years Experience</div>
          </div>
          <div className="absolute -top-4 -right-4 bg-[#0b1020] border border-orange-400/30 rounded-xl px-4 py-3 shadow-lg">
            <div className="text-2xl font-bold text-orange-400">5+</div>
            <div className="text-xs text-slate-400">Projects Shipped</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
