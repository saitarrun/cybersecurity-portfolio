import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MagneticElement } from './MagneticElement';

const FluidLetter = ({
  char,
  index,
  isGradient = false,
}: {
  char: string;
  index: number;
  isGradient?: boolean;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
      x.set(distanceX * 0.15);
      y.set(distanceY * 0.15);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleFocus = () => {
    // Reset on focus for keyboard users
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      tabIndex={-1}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.03,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        x: springX,
        y: springY,
        display: 'inline-block',
        ...(isGradient
          ? {
              background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          : {}),
      }}
      className="cursor-default"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

export const Hero = () => {
  const firstName = 'Sai Tarrun';
  const lastName = 'Pitta';

  return (
    <section id="about" className="relative overflow-hidden pt-20">
      {/* Cyber Hero Background Image */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full w-[50%] md:w-[40%] -translate-x-1/2"
          style={{
            maskImage: 'radial-gradient(ellipse 55% 65% at 50% 35%, black 0%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 65% at 50% 35%, black 0%, black 30%, transparent 75%)',
          }}
        >
          <img
            src="/cyber-hero.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top"
            style={{
              opacity: 0.15,
              filter: 'saturate(2) contrast(1.3) hue-rotate(0deg) brightness(1.1)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
        {/* Green channel ghost for glitch effect */}
        <div
          className="absolute left-1/2 top-0 h-full w-[50%] md:w-[40%] -translate-x-1/2"
          style={{
            maskImage: 'radial-gradient(ellipse 55% 65% at 50% 35%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 65% at 50% 35%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
            transform: 'translateX(calc(-50% + 3px)) translateY(-2px)',
          }}
        >
          <img
            src="/cyber-hero.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top"
            style={{
              opacity: 0.15,
              filter: 'saturate(0) sepia(1) hue-rotate(300deg) brightness(3)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest w-fit"
            style={{
              background: 'rgba(255, 0, 51, 0.08)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-label)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse neon-glow"
              style={{ background: 'var(--primary-dim)' }}
            />
            Available for work
          </div>
          <p
            className="text-xs sm:text-sm font-medium"
            style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}
          >
            Cybersecurity Enthusiast based in
            <br />
            <span className="text-white font-semibold">California</span>
          </p>
        </motion.div>

        {/* Massive Kinetic Typography */}
        <div className="relative mb-8">
          <h1
            className="text-6xl sm:text-8xl md:text-[12vw] font-black leading-none tracking-tighter text-white whitespace-wrap sm:whitespace-nowrap select-none flex flex-wrap"
            style={{ lineHeight: 0.88, fontFamily: 'var(--font-display)' }}
          >
            {firstName.split('').map((char, index) => (
              <FluidLetter key={index} char={char} index={index} />
            ))}
          </h1>
          <div className="flex items-end gap-2 sm:gap-6 mt-1 overflow-hidden">
            <h1
              className="text-6xl sm:text-8xl md:text-[12vw] font-black leading-none tracking-tighter whitespace-wrap sm:whitespace-nowrap select-none flex flex-wrap"
              style={{
                lineHeight: 0.88,
                fontFamily: 'var(--font-display)',
              }}
            >
              {lastName.split('').map((char, index) => (
                <FluidLetter key={index} char={char} index={index + firstName.length} isGradient />
              ))}
            </h1>
          </div>
        </div>

        {/* Tagline & CTA - 2 column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed text-center sm:text-left"
              style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-body)' }}
            >
              Hunting threats. Breaking systems ethically. Securing what matters. Passionate about
              penetration testing, red teaming, and security operations.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-fit"
            >
              <MagneticElement className="w-full sm:w-auto">
                <a
                  href="#projects"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-black font-bold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_20px_var(--primary-dim)] hover:-translate-y-0.5 w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                  }}
                >
                  See my work
                </a>
              </MagneticElement>
              <MagneticElement className="w-full sm:w-auto">
                <motion.a
                  href="#contact"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(255,0,51,0)',
                      '0 0 15px rgba(255,0,51,0.3)',
                      '0 0 0px rgba(255,0,51,0)',
                    ],
                    borderColor: [
                      'rgba(255,255,255,0.2)',
                      'rgba(255,0,51,0.5)',
                      'rgba(255,255,255,0.2)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="px-8 py-4 text-white font-bold text-sm rounded-full border border-white/20 transition-all duration-300 hover:border-primary hover:text-primary backdrop-blur-sm w-full sm:w-auto text-center min-h-[44px] flex items-center justify-center"
                >
                  Let's connect
                </motion.a>
              </MagneticElement>
            </motion.div>
          </motion.div>

          {/* Right column: Stats (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { label: '3+', desc: 'THM Paths' },
              { label: '50+', desc: 'Rooms Completed' },
              { label: '9', desc: 'Skill Domains' },
              { label: '4', desc: 'Cyber Projects' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-card bg-surface-container-low/40 ghost-border text-center"
              >
                <div className="text-2xl font-black text-primary mb-2">{stat.label}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  {stat.desc}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="h-6" />
    </section>
  );
};
