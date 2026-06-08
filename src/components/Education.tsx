import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { education, type Education as EducationData } from '../data/portfolio';

const EducationCard = ({ edu, index }: { edu: EducationData; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      className="group grid md:grid-cols-[100px_1fr] gap-8 md:gap-16 p-10 md:p-14 rounded-[2.5rem] transition-all duration-700 bg-surface-container-low/40 ghost-border hover:bg-surface-container-low hover:border-primary/40 hover:shadow-[0_0_50px_rgba(255,0,51,0.1)] w-full relative"
    >
      {/* Number Layer */}
      <div style={{ transform: 'translateZ(50px)' }} className="pt-2">
        <span
          className="text-6xl md:text-8xl font-black leading-none text-primary/10 group-hover:text-primary/30 transition-colors duration-500"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {edu.num}
        </span>
      </div>

      {/* Content Layer */}
      <div style={{ transform: 'translateZ(30px)' }}>
        <div className="flex flex-wrap items-baseline gap-4 mb-6">
          <h3
            className="text-3xl md:text-5xl font-black text-on-surface group-hover:text-primary transition-colors duration-500"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {edu.school}
          </h3>
          <span
            className="text-primary-dim font-bold text-lg uppercase tracking-[0.2em] opacity-80"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {edu.degree}
          </span>
        </div>

        {/* Period + Location Chips Layer */}
        <div className="flex flex-wrap gap-3 mb-10" style={{ transform: 'translateZ(40px)' }}>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.4em] px-5 py-2.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant border border-white/05 backdrop-blur-md"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {edu.period}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.4em] px-5 py-2.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant border border-white/05 backdrop-blur-md"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            {edu.location}
          </span>
        </div>

        <div className="space-y-4 max-w-4xl">
          {(Array.isArray(edu.description) ? edu.description : [edu.description]).map(
            (item: string, i: number) => (
              <p
                key={i}
                className="text-xl text-on-surface-variant leading-relaxed group-hover:text-on-surface/90 transition-colors duration-500"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {item}
              </p>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Education = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-5xl md:text-8xl font-black text-on-surface tracking-tighter uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Education
          </h2>
        </motion.div>

        {/* Education list */}
        <div className="flex flex-col gap-24">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
