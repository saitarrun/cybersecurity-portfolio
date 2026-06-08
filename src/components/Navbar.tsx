import { motion } from 'framer-motion';
import { Linkedin, Github, Menu } from 'lucide-react';
import { useState } from 'react';

const TryHackMeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M10.705 0C7.54 0 4.902 2.285 4.374 5.31a4.914 4.914 0 0 0-1.442-.214C1.317 5.096 0 6.414 0 8.029c0 1.616 1.317 2.934 2.932 2.934h7.773V0zm0 1.442v8.08H2.932A1.49 1.49 0 0 1 1.442 8.03c0-.824.666-1.491 1.49-1.491.3 0 .588.087.834.25l.899.592.097-1.079C5.065 3.42 7.682 1.442 10.705 1.442zm2.59.44v8.081h7.773A1.49 1.49 0 0 0 22.558 8.03c0-.824-.666-1.491-1.49-1.491-.3 0-.588.087-.834.25l-.9.592-.096-1.079C18.935 3.42 16.318 1.442 13.295 1.442zM0 11.405v1.442h24v-1.442zm0 2.883v8.27h1.442v-6.828h21.116v6.827H24v-8.269z" />
  </svg>
);

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
            }}
          >
            <span className="text-black text-[10px] sm:text-xs font-black">S</span>
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span
              className="font-black text-xs sm:text-base text-white tracking-tight truncate"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Sai Tarrun Pitta
            </span>
            <span
              className="text-[8px] sm:text-[10px] uppercase tracking-widest mt-0.5"
              style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}
            >
              Cybersecurity
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-all duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded px-2 py-1 outline-none"
              style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: socials + resume */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="https://github.com/saitarrun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden md:flex hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded transition-colors outline-none p-2"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/saitarrunpitta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden md:flex hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded transition-colors outline-none p-2"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://tryhackme.com/p/TarrunXploit404"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TryHackMe profile"
            className="hidden md:flex hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded transition-colors outline-none p-2"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <TryHackMeIcon />
          </a>
          <a href="/SaiTarrunPitta_Resume.html" target="_blank" rel="noopener noreferrer">
            <span
              className="px-3 sm:px-5 py-2 text-black text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:shadow-[0_0_15px_#ff0033] focus-visible:ring-2 focus-visible:ring-red-500 inline-flex items-center outline-none min-h-[44px]"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
              }}
            >
              Resume
            </span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden hover:text-white focus-visible:ring-2 focus-visible:ring-red-500 rounded transition-colors outline-none p-2 -mr-2"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8 bg-surface/80 backdrop-blur-[20px] border-b border-white/10">
          {['Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm hover:text-white transition-colors py-2 px-3 -mx-3 rounded focus-visible:ring-2 focus-visible:ring-red-500 outline-none min-h-[44px] flex items-center"
              style={{ color: 'var(--on-surface-variant)' }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </motion.nav>
  );
};
