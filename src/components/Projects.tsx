import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { projects, type Project } from '../data/portfolio';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
      className="group grid grid-cols-1 gap-6 items-start p-8 md:p-12 rounded-card-lg transition-all duration-700 bg-surface-container-low/40 hover:bg-surface-container-low ghost-border hover:border-primary/40 hover:shadow-card-hover h-full"
    >
      {/* Number */}
      <span
        style={{ transform: 'translateZ(50px)' }}
        className="text-4xl sm:text-6xl md:text-8xl font-black text-primary/10 group-hover:text-primary/30 transition-colors duration-500 leading-none md:col-span-1"
      >
        {project.num}
      </span>

      {/* Content */}
      <div style={{ transform: 'translateZ(30px)' }}>
        <p
          className="text-primary-dim text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] mb-2 sm:mb-4"
          style={{ fontFamily: 'var(--font-label)' }}
        >
          {project.tech}
        </p>
        <h3
          className="text-xl sm:text-3xl md:text-5xl font-black text-on-surface mb-4 sm:mb-6 transition-all duration-500 group-hover:translate-x-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="group-hover:text-gradient leading-[1.1] inline-block">
            {project.title}
          </span>
        </h3>
        <p
          className="text-on-surface-variant text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {project.description}
        </p>
      </div>

      {/* Arrow link */}
      <div className="md:pl-8 col-span-1 md:col-span-1" style={{ transform: 'translateZ(40px)' }}>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ghost-border flex items-center justify-center text-on-surface-variant group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 group-hover:rotate-45 inline-flex flex-shrink-0"
        >
          <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </a>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2
            className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Selected Projects
          </h2>
        </motion.div>

        {/* Desktop: 2-3 column grid | Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
