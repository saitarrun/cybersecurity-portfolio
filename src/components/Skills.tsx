import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { skillGroups, type SkillGroup } from '../data/portfolio';

const SkillCard = ({ group, index }: { group: SkillGroup; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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
      transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      className="group p-8 md:p-12 rounded-card bg-surface-container-low/40 ghost-border hover:bg-surface-container-low transition-all duration-500 hover:border-primary/40 hover:shadow-card-hover h-full"
    >
      <div style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-start justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex-1">
            <span
              className="text-primary-dim text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-2 sm:mb-3 block"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              {group.num} / Technical Module
            </span>
            <h3
              className="text-lg sm:text-2xl md:text-3xl font-black text-on-surface"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {group.title}
            </h3>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-full bg-surface-container-highest/60 backdrop-blur-md flex items-center justify-center border border-white/05 text-primary/40 group-hover:text-primary transition-colors flex-shrink-0">
            {group.icon}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {group.skills.map((skill: string) => (
            <motion.span
              key={skill}
              whileHover={{
                scale: 1.08,
                borderColor: 'rgba(255, 0, 51, 0.5)',
                color: 'rgba(255, 0, 51, 1)',
                backgroundColor: 'rgba(255, 0, 51, 0.05)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-[7px] sm:text-[9px] font-bold uppercase tracking-[0.15em] text-on-surface-variant bg-surface-container-highest/40 rounded-lg border border-white/05 cursor-default backdrop-blur-sm"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2
            className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter uppercase mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Technical Stack
          </h2>
          <p
            className="text-primary-dim text-base md:text-lg font-bold uppercase tracking-[0.5em]"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Engineered for Performance
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillGroups.map((group, index) => (
            <SkillCard key={index} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
