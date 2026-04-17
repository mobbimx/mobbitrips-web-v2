'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../lib/cn';

type Direction = 'up' | 'down' | 'left' | 'right';

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  as: Tag = 'div',
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = directionMap[direction];

  const initial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...offset };
  const animate = { opacity: 1, x: 0, y: 0 };

  const MotionTag = motion(Tag as 'div');

  return (
    <MotionTag
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

export { AnimatedSection };
export type { AnimatedSectionProps };
