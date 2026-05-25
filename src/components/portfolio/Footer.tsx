import React from 'react';
import { Github, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06091a] text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-white font-bold text-lg mb-3">
              Samuel<span className="text-cyan-400">.M</span>
            </div>
            <p className="text-sm leading-relaxed">
              Full Stack Software Engineer building scalable, secure, and impactful web applications.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition">Projects</a></li>
              <li><a href="#experience" className="hover:text-cyan-400 transition">Experience</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Stack</h4>
            <ul className="space-y-2 text-sm">
              <li>React & Redux</li>
              <li>Node.js & Express</li>
              <li>MongoDB & MySQL</li>
              <li>Docker & CI/CD</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> Sammbogo81@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Nairobi, Kenya</li>
              <li>
                <a href="https://github.com/samuel-m765" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-cyan-400 transition">
                  <Github className="w-4 h-4" /> samuel-m765
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} Samuel Mbogo. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            Back to top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
