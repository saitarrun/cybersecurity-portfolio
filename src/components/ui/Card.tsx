import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'elevated' | 'outlined';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  hoverable?: boolean;
  animationDelay?: number;
}

const variantStyles = {
  default: 'bg-surface-container-low/40 ghost-border',
  elevated: 'bg-surface-container/60 shadow-lg ghost-border',
  outlined: 'bg-transparent ghost-border',
};

export const Card = ({
  children,
  variant = 'default',
  className = '',
  hoverable = false,
  animationDelay = 0,
}: CardProps) => {
  const baseStyles = `rounded-card transition-all duration-500 ${variantStyles[variant]} ${
    hoverable ? 'hover:border-primary/40 hover:shadow-card-hover' : ''
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: animationDelay * 0.1, duration: 0.6 }}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
};
