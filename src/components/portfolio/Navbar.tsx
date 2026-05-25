import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];


const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const isHome = window.location.pathname === '/';
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0b1020]/90 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => handleClick('#hero')}
          className="flex items-center gap-2 text-white font-bold text-lg"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-orange-500 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-[#0b1020]" />
          </span>
          <span>
            Samuel<span className="text-cyan-400">.M</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleClick(l.href)}
              className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleClick('#contact')}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-[#0b1020] font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            Hire Me
          </button>
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0b1020]/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="text-left text-slate-300 hover:text-cyan-400 py-2"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
