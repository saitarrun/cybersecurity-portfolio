import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  target?: string;
  rel?: string;
}

const variantStyles = {
  primary: 'bg-primary text-on-primary hover:bg-primary-fixed hover:neon-glow',
  secondary:
    'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-white/10 hover:border-primary/50',
  ghost:
    'text-on-surface-variant hover:text-primary border border-white/10 hover:border-primary/40',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm min-h-[44px] flex items-center',
  lg: 'px-8 py-4 text-base min-h-[48px] flex items-center',
};

export const Button = ({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  target,
  rel,
}: ButtonProps) => {
  const baseStyles = `font-bold uppercase tracking-widest rounded-full transition-all duration-300 inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-primary outline-none ${variantStyles[variant]} ${sizeStyles[size]}`;

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`${baseStyles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {content}
    </motion.button>
  );
};
