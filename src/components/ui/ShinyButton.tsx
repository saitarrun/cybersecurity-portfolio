import React from 'react';
import { motion } from 'framer-motion';

interface ShinyButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const ShinyButton = ({
  children,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
}: ShinyButtonProps) => {
  const baseStyles =
    'relative px-8 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 text-sm tracking-wide focus-visible:ring-2 focus-visible:ring-white outline-none';

  const variants = {
    primary:
      'bg-[#F97316] text-white hover:bg-[#FB923C] shadow-lg hover:shadow-[#F97316]/30 hover:shadow-xl',
    secondary:
      'bg-white/[0.06] text-white border border-white/10 hover:border-white/20 hover:bg-white/10',
    outline: 'border border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};
